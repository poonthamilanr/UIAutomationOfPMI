import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from "foundation/Profile/client/Profile/actions";
import * as applicationActions from "foundation/Application/client/Application/actions";
import * as examActions from "foundation/Application/client/Exam/actions";
import * as loaderActions from "foundation/FormFields/client/components/PageLoader/actions";
import { getProfile, getProfileRequestIdle } from 'foundation/Profile/client/Profile/accessors';
import { getApplication, getApplicationRequestIdle, getActiveExam } from 'foundation/Application/client/Application/accessors';
import withWorkflow from 'foundation/Workflow/client/WorkflowSettings';
import withPageWorkflowValidation from 'foundation/Workflow/client/withPageWorkflowValidation';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { getWorkflowType } from 'foundation/Application/client/certtype-storage';
import { getPageForms } from './accessors';
import * as uiActions from './actions';

class ExamDetails extends React.Component {
  componentDidMount() {
    const { profileData, profileRequestIdle, applicationData, applicationRequestIdle, fetchProfileData, fetchApplicationData, hideLoader, activeExamData, fetchMcExamData } = this.props;
    hideLoader();

    if (!applicationData && applicationRequestIdle) {
      if(getWorkflowType() === 'MCExam')
      {
        if(!activeExamData)
        {
          fetchMcExamData();
        }
      }
      else
      {
        fetchApplicationData();
      }
    }
    if (!profileData && profileRequestIdle) {
      fetchProfileData();
    }

    this.closeOpenForms();
  }

  componentDidUpdate() {
    this.closeOpenForms();
  }

  closeOpenForms() {
    const { pageForms, openForm } = this.props;
    const allInitialized = Object.values(pageForms).every(form => form.initialized);
    const openedForm = Object.values(pageForms).find(form => form.isOpen);

    if (allInitialized && !openedForm) {
      Object.keys(pageForms).every(key => {
        if (!pageForms[key].isValid && !pageForms[key].isOpen) {
          openForm(key);
          return false;
        }
        return true;
      })
    }
  }

  render() {
    const { rendering } = this.props;

    return (
      <div className="layout__content layout__content-exam-details">
        <Placeholder name="cert-app-exam-details" rendering={rendering} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profileData: getProfile(state),
  applicationData: getApplication(state),
  activeExamData: getActiveExam(state),
  profileRequestIdle: getProfileRequestIdle(state),
  applicationRequestIdle: getApplicationRequestIdle(state),
  pageForms: getPageForms(state),
});

const mapDispatchToProps = dispatch => ({
  fetchProfileData: () => dispatch(actions.fetchProfile()),
  fetchApplicationData: () => dispatch(applicationActions.fetchApplicationWithAppRequirements()),
  fetchMcExamData: () => dispatch(examActions.fetchExams()),
  hideLoader: () => dispatch(loaderActions.hidePageLoader()),
  openForm: (formKey) => dispatch(uiActions.openForm(formKey)),
});

export default compose(
  withSitecoreContext(),
  withWorkflow(),
  withPageWorkflowValidation,
  connect(mapStateToProps, mapDispatchToProps),
)(ExamDetails);
