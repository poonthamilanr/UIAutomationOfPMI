import React from 'react';
import { connect } from 'react-redux';
import i18n from 'i18next';
import { LinkButton } from '@pmi/dsm-react-bs4';
import { getExperience, getExperienceStatus, getExperienceRequirement } from 'foundation/Application/client/Experience/accessors';
import { ApiStatus } from 'foundation/CertificationApiCore/client/constants';
import { getListsSettings, getGlobalSettings } from 'foundation/SitecoreSettings/client/accessors';
import { getOpenRef } from './accessors';
import * as uiActions from "./actions";
import PortfolioExperienceView from "./view";
import PortfolioExperienceEdit from "./edit";

class PortfolioExperience extends React.Component {
  handleAddExperienceClick = () => {
    this.props.openEditForm('add');
  }

  render() {
    const { experienceArray, experienceArrayStatus, fields, openRef, portfolioRequirements: { requirementMet }, sitecoreSettings, sitecoreListsSettings } = this.props;

    if (!fields) return <div className="static-height"/>;

    if (!sitecoreSettings || !sitecoreListsSettings) {
      return null;
    }

    const dataReady = experienceArrayStatus !== ApiStatus.Idle;
    const portfolioExperiences = experienceArray.filter(exp => exp.workExperienceTypeEnum === 'Portfolio');
    const hasAddForm = dataReady && (!portfolioExperiences.length || openRef === 'add');
    const hasAddButton = dataReady && !hasAddForm && !requirementMet;

    return (
      <>
        {portfolioExperiences.map(experience => (
          experience._links.self.href === openRef
            ? <PortfolioExperienceEdit
              key={experience._links.self.href}
              experience={experience}
              sitecoreSettings={sitecoreSettings}
              sitecoreListsSettings={sitecoreListsSettings}
              fields={fields} />
            : <PortfolioExperienceView
              key={experience._links.self.href}
              experience={experience}
              sitecoreListsSettings={sitecoreListsSettings}
              fields={fields} />
        ))}
        {hasAddForm &&
          <PortfolioExperienceEdit
            addForm
            sitecoreSettings={sitecoreSettings}
            sitecoreListsSettings={sitecoreListsSettings}
            fields={fields}
            isShowCancelButton={portfolioExperiences.length > 0} />}
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
  portfolioRequirements: getExperienceRequirement('Portfolio')(state),
  sitecoreListsSettings: getListsSettings(state),
  sitecoreSettings: getGlobalSettings(state),
});

const mapDispatchToProps = dispatch => ({
  openEditForm: ref => dispatch(uiActions.setOpenRef(ref)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioExperience);