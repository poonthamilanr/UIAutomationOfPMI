import React from 'react';
import { connect } from 'react-redux';
import i18n from 'i18next';
import { LinkButton } from '@pmi/dsm-react-bs4';
import { getExperience, getExperienceStatus, getExperienceRequirement } from 'foundation/Application/client/Experience/accessors';
import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import { getListsSettings, getGlobalSettings } from 'foundation/SitecoreSettings/client/accessors';
import { getOpenRef, getOpenSubRef } from './accessors';
import * as uiActions from "./actions";
import ProgramExperienceView from "./view";
import ProgramExperienceEdit from "./edit";
import SubProjects from "./SubProjects";

class ProgramExperience extends React.Component {
  static displayName = 'ProgramExperience';

  handleAddExperienceClick = () => {
    this.props.openEditForm('add');
  }

  render() {
    const { experienceArray, experienceArrayStatus, fields, openRef, openSubRef, programRequirements: { requirementMet }, sitecoreSettings, sitecoreListsSettings } = this.props;

    if (!fields) return <div className="static-height"/>;

    if (!sitecoreSettings || !sitecoreListsSettings) {
      return null;
    }

    const dataReady = experienceArrayStatus !== ApiStatus.Idle;
    const saving = experienceArrayStatus === ApiStatus.Submitting;
    const programExperience = experienceArray.filter(exp => exp.workExperienceTypeEnum === 'Program');
    const hasAddForm = dataReady && (programExperience.length < 1 || openRef === 'add');
    const hasOneCompleteExperience = programExperience.length > 0 && programExperience[0].existing;
    const allExperiencesComplete = programExperience.length > 0 && programExperience.every(x => x.existing);
    const hasAddButton = dataReady && !hasAddForm && allExperiencesComplete && !requirementMet;

    return <>
      {programExperience.map(experience => {
        const experienceEditable = experience._links.self.href === openRef;
        const subProjectsEditable = experience._links.self.href === openSubRef;
        return (
          <div key={experience._links.self.href} className="experience-program">
            {experienceEditable ? (
              <>
                <ProgramExperienceEdit
                  experience={experience}
                  fields={fields}
                  sitecoreListsSettings={sitecoreListsSettings}
                  sitecoreSettings={sitecoreSettings}
                  saving={saving} />
                {experience.subProjects && experience.subProjects.length > 0 && (
                  <SubProjects
                    experience={experience}
                    fields={fields}
                    sitecoreListsSettings={sitecoreListsSettings}
                    editable={false} />
                )}
              </>
            ) : (
              <>
                <ProgramExperienceView
                  experience={experience}
                  fields={fields}
                  sitecoreListsSettings={sitecoreListsSettings} />
                <SubProjects
                  experience={experience}
                  fields={fields}
                  editable={subProjectsEditable}
                  sitecoreListsSettings={sitecoreListsSettings} />
              </>
            )}
          </div>
        )
      })}
      {hasAddForm &&
        <ProgramExperienceEdit
          addForm
          fields={fields}
          isShowCancelButton={hasOneCompleteExperience}
          sitecoreListsSettings={sitecoreListsSettings}
          sitecoreSettings={sitecoreSettings}
          saving={saving} />}
      {hasAddButton &&
        <LinkButton
          className="link-base d-inline-flex mt-3"
          onClick={this.handleAddExperienceClick}
          titleText={i18n.t('cert-app.Experience.Experience.AddAdditionalExperience')}
        />}
    </>
  }
}

const mapStateToProps = state => ({
  experienceArray: getExperience(state),
  experienceArrayStatus: getExperienceStatus(state),
  openRef: getOpenRef(state),
  openSubRef: getOpenSubRef(state),
  programRequirements: getExperienceRequirement('Program')(state),
  sitecoreListsSettings: getListsSettings(state),
  sitecoreSettings: getGlobalSettings(state),
});

const mapDispatchToProps = dispatch => ({
  openEditForm: ref => dispatch(uiActions.setOpenRef(ref)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgramExperience);