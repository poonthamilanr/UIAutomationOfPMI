import React from 'react';
import { connect } from 'react-redux';
import i18n from 'i18next';
import { LinkButton } from '@pmi/dsm-react-bs4';
import { getExperience, getExperienceStatus, getExperienceRequirement } from 'foundation/Application/client/Experience/accessors';
import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import { getListsSettings, getGlobalSettings } from 'foundation/SitecoreSettings/client/accessors';
import { getOpenRef } from './accessors';
import * as uiActions from "./actions";
import ProjectExperienceView from "./view";
import ProjectExperienceEdit from "./edit";

class ProjectExperience extends React.Component {
  static displayName = 'ProjectExperience';

  handleAddExperienceClick = () => {
    this.props.openEditForm('add');
  }

  render() {
    const { experienceArray, experienceArrayStatus, fields, openRef, projectRequirements: { requirementMet }, sitecoreSettings, sitecoreListsSettings } = this.props;

    if (!fields) return <div className="static-height"/>;

    if (!sitecoreSettings || !sitecoreListsSettings) {
      return null;
    }

    const dataReady = experienceArrayStatus !== ApiStatus.Idle;
    const projectExperiences = experienceArray.filter(exp => exp.workExperienceTypeEnum === 'Project');
    const hasAddForm = dataReady && (!projectExperiences.length || openRef === 'add');
    const hasAddButton = dataReady && !hasAddForm && !requirementMet;

    return (
      <>
        {projectExperiences.map(experience => (
          experience._links.self.href === openRef
            ? <ProjectExperienceEdit
              experience={experience}
              fields={fields}
              key={experience._links.self.href}
              sitecoreListsSettings={sitecoreListsSettings}
              sitecoreSettings={sitecoreSettings} />
            : <ProjectExperienceView
              experience={experience}
              fields={fields}
              key={experience._links.self.href}
              sitecoreListsSettings={sitecoreListsSettings} />
        ))}
        {hasAddForm &&
          <ProjectExperienceEdit
            addForm
            fields={fields}
            isShowCancelButton={projectExperiences.length > 0}
            sitecoreListsSettings={sitecoreListsSettings}
            sitecoreSettings={sitecoreSettings} />}
        {hasAddButton &&
          <LinkButton
            className="link-base d-inline-flex mt-3"
            onClick={this.handleAddExperienceClick}
            titleText={i18n.t('cert-app.Experience.Experience.AddAdditionalExperience')}
          />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  experienceArray: getExperience(state),
  experienceArrayStatus: getExperienceStatus(state),
  openRef: getOpenRef(state),
  projectRequirements: getExperienceRequirement('Project')(state),
  sitecoreListsSettings: getListsSettings(state),
  sitecoreSettings: getGlobalSettings(state),
});

const mapDispatchToProps = dispatch => ({
  openEditForm: ref => dispatch(uiActions.setOpenRef(ref)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectExperience);