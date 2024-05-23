import { call, put, takeLatest, select} from "redux-saga/effects";
import withAppRequirements from "foundation/AppRequirements/client/withAppRequirements";
import { getAcademicEducation } from 'foundation/Application/client/AcademicEducation/accessors';
import { fetchCountryByCode } from "foundation/Profile/client/Metadata/countries/api";
import { getAcademicEducation as getAppAcademicEducation, getAcademicEducationApi } from 'foundation/Application/client/Application/accessors';
import { getProfileAcademicEducationApi } from 'foundation/Profile/client/Profile/accessors';
import * as profileApi from "foundation/Profile/client/AcademicEducation/api";
import { FETCH_APPLICATION_SUCCESS } from "../Application/actions";
import * as actions from "./actions";
import * as applicationApi from "./api";

const profileAcademicEducationMap = {
  EducationLevel: 'degreeEnum',
  yearStarted: 'yearStarted',
  YearEnded: 'yearOfDegree',
  CountryOfInstitution: 'schoolCountryCode',
  nameOfUniversity: 'schoolName',
  GacUniversityId: 'accreditedUniversityId',
  DegreeProgram: 'accreditedUniversityDegreeId',
  FieldOfStudy: 'fieldOfStudyEnum',
  schoolName: 'schoolName',
};

function* fetchAcademicEducation() {
  try {
    const state = yield select();
    let academicEducation = getAcademicEducation(state) || getAppAcademicEducation(state);

    if (academicEducation && academicEducation.schoolCountryCode) {
      const { schoolCountryCode } = academicEducation;
      const schoolCountry = yield call(fetchCountryByCode, schoolCountryCode);
      academicEducation = {...academicEducation, schoolCountry}
    }
    yield put(actions.fetchAcademicEducationSuccess(academicEducation));
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.fetchAcademicEducationFailure());
  }
}

const saveAcademicEducation = withAppRequirements(function* (action) {
  try {
    const state = yield select();
    const data = {
      ...getAcademicEducation(state),
      ...action.payload,
    };

    delete data.accreditedUniversity;
    delete data.accreditedUniversityDegree;
    delete data.schoolCountry;

    // Save to profile
    let hasInProfile = false;
    let savedToProfile = false;

    const profileData = Object.keys(profileAcademicEducationMap).reduce((result, key) => {
      const value = data[profileAcademicEducationMap[key]];
      if (value !== undefined) result[key] = value; // eslint-disable-line
      return result;
    }, {});

    try {
      hasInProfile = Boolean(yield call(profileApi.fetchProfileAcademicEducation, {
        url: getProfileAcademicEducationApi(state),
      }));
    } catch (e) {
      if (!e.response || e.response.status !== 204) {
        throw e;
      }
    }

    if (hasInProfile) {
      savedToProfile = yield call(profileApi.updateProfileAcademicEducation, {
        data: profileData,
        url: getProfileAcademicEducationApi(state),
      });
    } else {
      savedToProfile = yield call(profileApi.createProfileAcademicEducation, {
        data: profileData,
        url: getProfileAcademicEducationApi(state),
      });
    }

    // Save to application
    const savedToApplication = yield call(applicationApi.saveAcademicEducation, {
      data,
      url: getAcademicEducationApi(state),
    });

    if (savedToProfile && savedToApplication) {
      let result = action.payload;
      if (!result.schoolCountry) {
        const schoolCountry = yield call(fetchCountryByCode, action.payload.schoolCountryCode);
        result = {...result, schoolCountry};
      }
      yield put(actions.saveAcademicEducationSuccess(result));
    } else {
      yield put(actions.saveAcademicEducationFailure(action.payload));
    }

  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.saveAcademicEducationFailure(action.payload));
  }
});

function* watchFetchAcademicEducationRequest() {
  yield takeLatest(FETCH_APPLICATION_SUCCESS, fetchAcademicEducation);
}

function* watchSaveAcademicEducationRequest() {
  yield takeLatest(actions.SAVE_ACADEMIC_EDUCATION_REQUEST, saveAcademicEducation);
}

const academicEducationSagaWatchers = [
  watchFetchAcademicEducationRequest,
  watchSaveAcademicEducationRequest,
];

export default academicEducationSagaWatchers;
