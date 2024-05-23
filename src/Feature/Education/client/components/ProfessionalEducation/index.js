import React from 'react';
import i18n from 'i18next';
import { connect } from 'react-redux';
import { LinkButton } from '@pmi/dsm-react-bs4';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import { getProfessionalEducation, getEducationRequirements } from 'foundation/Application/client/ProfessionalEducation/accessors';
import { getListsSettings, getGlobalSettings } from 'foundation/SitecoreSettings/client/accessors';
import { getOpenRef } from './accessors';
import * as uiActions from "./actions";
import ProfessionalEducationView from "./view";
import ProfessionalEducationEdit from "./edit";
import './professionalEducation.scss';

class ProfessionalEducation extends React.Component {
  showAddForm = () => {
    this.props.openEditForm('add-prof-education');
  }

  render() {
    const { educationArray, eduRequirements, openRef, sitecoreListsSettings, sitecoreSettings, fields } = this.props;
    const { hoursRequired, requirementMet } = eduRequirements;

    if (!fields) return <div className="static-height"/>;

    if (!isPageSimulation() && (!hoursRequired || hoursRequired === 0)) {
      return null;
    }

    return (
      <>
        {hoursRequired > 0 &&
          <>
            {educationArray.length > 0
              ? <>
                {educationArray.map(education => (
                  education._links.self.href === openRef
                    ? <ProfessionalEducationEdit
                      key={education._links.self.href}
                      education={education}
                      sitecoreSettings={sitecoreSettings}
                      sitecoreListsSettings={sitecoreListsSettings}
                      fields={fields}
                    />
                    : <ProfessionalEducationView
                      key={education._links.self.href}
                      education={education}
                      sitecoreSettings={sitecoreSettings}
                      sitecoreListsSettings={sitecoreListsSettings}
                      fields={fields}
                    />
                ))}
                {!requirementMet && (
                  openRef === 'add-prof-education'
                    ? <ProfessionalEducationEdit
                      sitecoreSettings={sitecoreSettings}
                      sitecoreListsSettings={sitecoreListsSettings}
                      fields={fields}
                      isShowCancelButton
                    />
                    : <LinkButton
                      className="link-base d-inline-flex mt-3"
                      onClick={this.showAddForm}
                      titleText={i18n.t('cert-app.Education.ProfessionalEducation.AddAdditionalEducation')}
                    />
                )}
              </>
              : <ProfessionalEducationEdit
                sitecoreSettings={sitecoreSettings}
                sitecoreListsSettings={sitecoreListsSettings}
                fields={fields}
              />}
          </>}
      </>
    );
  }
}

const mapStateToProps = state => ({
  educationArray: getProfessionalEducation(state),
  openRef: getOpenRef(state),
  eduRequirements: getEducationRequirements(state),
  sitecoreListsSettings: getListsSettings(state),
  sitecoreSettings: getGlobalSettings(state),
});

const mapDispatchToProps = dispatch => ({
  openEditForm: ref => dispatch(uiActions.setOpenRef(ref)),
});

export default withSitecoreContext()(connect(mapStateToProps, mapDispatchToProps)(ProfessionalEducation));
