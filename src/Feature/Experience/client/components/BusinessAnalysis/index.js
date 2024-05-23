import React from 'react';
import { connect } from 'react-redux';
import i18n from 'i18next';
import { LinkButton } from '@pmi/dsm-react-bs4';
import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import { getExperience, getExperienceStatus, getExperienceRequirement } from 'foundation/Application/client/Experience/accessors';
import { getListsSettings, getGlobalSettings } from 'foundation/SitecoreSettings/client/accessors';
import { getOpenRef } from './accessors';
import * as uiActions from "./actions";
import BusinessAnalysisExperienceView from "./view";
import BusinessAnalysisExperienceEdit from "./edit";

class BusinessAnalysisExperience extends React.Component {
  handleAddExperienceClick = () => {
    this.props.openEditForm('add');
  }

  render() {
    const { experienceArray, experienceArrayStatus, fields, openRef, businessAnalysisRequirements: { requirementMet }, sitecoreSettings, sitecoreListsSettings } = this.props;

    if (!fields) return <div className="static-height"/>;

    if (!sitecoreSettings || !sitecoreListsSettings) {
      return null;
    }

    const dataReady = experienceArrayStatus !== ApiStatus.Idle;
    const businessAnalysisExperience = experienceArray.filter(exp => exp.workExperienceTypeEnum === 'BusinessAnalysis');
    const hasAddForm = dataReady && (!businessAnalysisExperience.length || openRef === 'add');
    const hasAddButton = dataReady && !hasAddForm && !requirementMet;

    return (
      <>
        {businessAnalysisExperience.map(experience => (
          experience._links.self.href === openRef
            ? <BusinessAnalysisExperienceEdit
              key={experience._links.self.href}
              experience={experience}
              sitecoreSettings={sitecoreSettings}
              sitecoreListsSettings={sitecoreListsSettings}
              fields={fields} />
            : <BusinessAnalysisExperienceView
              key={experience._links.self.href}
              experience={experience}
              sitecoreListsSettings={sitecoreListsSettings}
              fields={fields} />
        ))}
        {hasAddForm &&
          <BusinessAnalysisExperienceEdit
            addForm
            sitecoreSettings={sitecoreSettings}
            sitecoreListsSettings={sitecoreListsSettings}
            fields={fields}
            isShowCancelButton={businessAnalysisExperience.length > 0} />}
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
  businessAnalysisRequirements: getExperienceRequirement('BusinessAnalysis')(state),
  experienceArray: getExperience(state),
  experienceArrayStatus: getExperienceStatus(state),
  openRef: getOpenRef(state),
  sitecoreListsSettings: getListsSettings(state),
  sitecoreSettings: getGlobalSettings(state),
});

const mapDispatchToProps = dispatch => ({
  openEditForm: ref => dispatch(uiActions.setOpenRef(ref)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BusinessAnalysisExperience);
