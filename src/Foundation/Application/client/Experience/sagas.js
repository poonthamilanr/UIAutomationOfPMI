/* eslint-disable require-atomic-updates */
import { all, call, put, takeLatest, take, select } from "redux-saga/effects";
import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import withAppRequirements from "foundation/AppRequirements/client/withAppRequirements";
import { getExperienceResources, getExperienceApi } from 'foundation/Application/client/Application/accessors';
import { getExperience } from './accessors';
import { FETCH_APPLICATION_SUCCESS, FETCH_OPEN_APPLICATION_SUCCESS } from "../Application/actions";
import applicationMock from "../Application/mock";
import * as actions from "./actions";
import * as api from "./api";

function* fetchExperience() {
  try {
    const state = yield select();
    let experience = getExperience(state);
    // Get Expereinces
    experience = experience.length ? experience : getExperienceResources(state);

    yield put(actions.fetchExperienceSuccess(experience));
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.fetchExperienceFailure());
  }
}

function* fetchExperienceSubprojects() {
  try {
    let state = yield select();
    let experience = getExperience(state);

    if (!experience.length) {
      yield take(actions.FETCH_EXPERIENCE_SUCCESS);
    }

    state = yield select();
    experience = getExperience(state);

    // Get sub-projects (only for Program Expereinces)
    const subProjects = yield all(
      experience.filter(exp => exp.workExperienceTypeEnum === 'Program').map(exp => {
        if (isPageSimulation()) {
          const isProject = exp => exp.workExperienceTypeEnum === 'Project';
          const project = applicationMock._embedded.experience.resources.filter(isProject)[0];
          return { ...exp, resources: [project, project] };
        }

        return call(api.fetch, { url: `${exp._links.self.href}/ExperienceProjects` });
      }),
    );
    // Update Expereinces with sub-projects
    subProjects.map(project => {
      const index = experience.findIndex(exp => exp._links && project._links.self.href.toLowerCase().indexOf(exp._links.self.href.toLowerCase()) > -1);
      experience[index].subProjects = project.resources.map(sub => ({ ...sub, existing: true }));
      experience[index].existing = true; // required for UI buffering logic
      return index;
    });

    yield put(actions.fetchExperienceSubprojectsSuccess(experience));
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.fetchExperienceSubprojectsFailure());
  }
}

const saveExperience = withAppRequirements(function* (action) {
  let savedExperience;
  try {
    const state = yield select();
    const { _links, applicationId, existing, ...data } = { ...action.payload };

    if (data.workExperienceTypeEnum === "Program" && existing || data.workExperienceTypeEnum !== "Program" && !!_links) {
      savedExperience = yield call(api.update, {
        data,
        url: _links.self.href,
      });
    } else {
      savedExperience = yield call(api.create, {
        data,
        url: getExperienceApi(state),
      });
    }
    savedExperience = {
      ...savedExperience,
      existing: true,
    }
    yield put(actions.saveExperienceSuccess(savedExperience));
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.saveExperienceFailure(action.payload));
  }
  return savedExperience;
});

function* bufferExperience(action) {
  try {
    const state = yield select();
    const { _links, applicationId, ...data } = { ...action.payload };
    const experience = getExperience(state);
    const tempId = experience.filter(exp => exp.workExperienceTypeEnum === 'Program').length;
    const savedExperience = {
      ...data,
      _links: _links || { self: { href: `${getExperienceApi(state)}/${tempId}` } },
    }
    yield put(actions.bufferExperienceSuccess(savedExperience));

  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.bufferExperienceFailure(action.payload));
  }
}

const deleteExperience = withAppRequirements(function* (action) {
  try {
    const { existing, _links, workExperienceTypeEnum } = action.payload;
    const url = _links.self.href;
    if (workExperienceTypeEnum !== "Program" || workExperienceTypeEnum === "Program" && existing) {
      yield call(api.remove, { url });
    }
    yield put(actions.deleteExperienceSuccess(url));

  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.deleteExperienceFailure(action.payload));
  }
});

function* saveSubProject(action) {
  try {
    const state = yield select();
    const { _links, ...data } = { ...action.payload };
    const experiences = getExperience(state);
    const experience = experiences.find(exp => exp._links.self.href.toLowerCase() === `${getExperienceApi(state)}/${action.payload.experienceId}`.toLowerCase());
    const tempId = experience.subProjects && experience.subProjects.length || 0;
    const savedSubProject = {
      ...data,
      _links: _links || { self: { href: `${getExperienceApi(state)}/${action.payload.experienceId}/ExperienceProjects/${tempId}` } },
    }
    yield put(actions.saveSubProjectSuccess(savedSubProject));

  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.saveSubProjectFailure(action.payload));
  }
}

function* deleteSubproject(action) {
  try {
    yield put(actions.deleteSubProjectSuccess(action.payload));

  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.deleteSubProjectFailure(action.payload));
  }
}

const saveCompleteExperience = withAppRequirements(function* (action) {
  try {
    const { subProjects, ...data } = { ...action.payload };
    // Save Program
    const experience = yield call(saveExperience, { payload: data });
    // Save Sub-Projects
    const subProjectsPayload = subProjects.map(proj => {
      const { _links, experienceId, ...data } = proj;
      return data;
    })
    const savedSubProjects = yield call(api.create, {
      data: subProjectsPayload,
      url: `${experience._links.self.href}/ExperienceProjects/replace`,
    });
    if (!action.payload.existing) {
      yield put(actions.deleteExperience(action.payload)); // delete buffered expereince
    }
    yield put(actions.saveCompleteExperienceSuccess({ ...experience, subProjects: savedSubProjects.resources }));

  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.saveExperienceFailure(action.payload));
  }
});

function* watchFetchExperienceRequest() {
  yield takeLatest(FETCH_APPLICATION_SUCCESS, fetchExperience);
  yield takeLatest(FETCH_OPEN_APPLICATION_SUCCESS, fetchExperience);
}
function* watchFetchExperienceSubprojectsRequest() {
  yield takeLatest(actions.FETCH_EXPERIENCE_SUBPROJECTS_REQUEST, fetchExperienceSubprojects);
}
function* watchSaveExperienceRequest() {
  yield takeLatest(actions.SAVE_EXPERIENCE_REQUEST, saveExperience);
}
function* watchBufferExperienceRequest() {
  yield takeLatest(actions.BUFFER_EXPERIENCE_REQUEST, bufferExperience);
}
function* watchDeleteExperienceRequest() {
  yield takeLatest(actions.DELETE_EXPERIENCE_REQUEST, deleteExperience);
}
function* watchSaveSubProjectRequest() {
  yield takeLatest(actions.SAVE_SUBPROJECT_REQUEST, saveSubProject);
}
function* watchDeleteSubProjectRequest() {
  yield takeLatest(actions.DELETE_SUBPROJECT_REQUEST, deleteSubproject);
}
function* watchSaveCompleteExperienceRequest() {
  yield takeLatest(actions.SAVE_COMPLETE_EXPERIENCE_REQUEST, saveCompleteExperience);
}

const experienceSagaWatchers = [
  watchFetchExperienceRequest,
  watchSaveExperienceRequest,
  watchBufferExperienceRequest,
  watchDeleteExperienceRequest,
  watchSaveSubProjectRequest,
  watchDeleteSubProjectRequest,
  watchSaveCompleteExperienceRequest,
  watchFetchExperienceSubprojectsRequest,
];

export default experienceSagaWatchers;
