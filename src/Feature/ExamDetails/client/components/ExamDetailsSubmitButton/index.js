import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Button } from '@pmi/dsm-react-bs4';
import i18n from 'i18next';
import * as applicationActions from "foundation/Application/client/Application/actions";
import * as examActions from "foundation/Application/client/Exam/actions";
import { getApplicationStatus,getApplication } from "foundation/Application/client/Application/accessors";
import * as loaderActions from "foundation/FormFields/client/components/PageLoader/actions";
import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import { getPageStatus, getPageStatusByForm } from 'foundation/Page/client/accessors';
import { trackGeneralPageLink, certDataClickTracking } from 'foundation/Analytics/client/AdobeAnalytics/accessors'
import { getSitecoreContext } from 'foundation/Infrastructure/client/SitecoreContext/setSitecoreContext';
import { getWorkflowType } from 'foundation/Application/client/certtype-storage';
import CloseApplicationComponent from 'foundation/Workflow/client/components/CloseApplication';
import BackMyPmiComponent from 'foundation/Workflow/client/components/BackMyPmi';
import * as uiActions from "./actions";
import { getSubmitAppInitiatedFlag } from './accessors';

class ExamDetailsSubmitButton extends React.Component {
  componentDidUpdate(prevProps) {
    const { resetSubmitAppInitiated } = this.props;

    if(!prevProps.submitAppInitiated && this.props.submitAppInitiated) {
      resetSubmitAppInitiated()
      this.submitApplication()
    }
  }

  isSubmitting() {
    const { submitAppInitiated, applicationStatus } = this.props;
    const applicationSubmitting = submitAppInitiated || applicationStatus === ApiStatus.Submitting;
    return applicationSubmitting;
  }

  onClick = () => {
    this.submitApplication()
  }

  onCancel = () => {
    const { appRedirects } = getSitecoreContext();
    const redirectUrls = appRedirects.redirectLinks;
    window.location.href = `${redirectUrls.MyPmiMCDashboard}`;
  }



  submitApplication = () => {
    const {pageStatus, submitApplicationForReview, history, showLoader, applicationData, submitExamDetails, mcPageStatus } = this.props;
    const isMCExam = getWorkflowType() === 'MCExam';
    if ((isMCExam && mcPageStatus) ||  pageStatus) {
      showLoader();
      const linkTracking = {
        linkTitle: this.renderText(),
        linkModule: this.buttonRegion,
        targetUrl: '',
      };
      certDataClickTracking(applicationData,this.renderText());
      trackGeneralPageLink({linkTracking});
      if(isMCExam && mcPageStatus)
      {
        submitExamDetails();
      }
      else
      {
        submitApplicationForReview({ history });
      }
    } else {
      console.log('Error: input required fields, before submitting application')
    }
  }

  renderText = () => {
    const { fields } = this.props;

    if (fields && fields.Title) {
      return fields.Title.value;
    }
    return i18n.t('cert-app.PageComponents.ContinueButton.SubmitApplication');
  }

  buttonRegion = "exam-submit";

  render() {
    const { pageStatus, mcPageStatus } = this.props;
    const isMCExam = getWorkflowType() === 'MCExam';
    const disabled = isMCExam ? !mcPageStatus : !pageStatus || this.isSubmitting();
    return (
      <div id={this.buttonRegion} className="form-action-row border-top" adoberegion={this.buttonRegion}>
        <BackMyPmiComponent />
        {!isMCExam && <CloseApplicationComponent  />}
        {isMCExam &&  <Button
          onClick={this.onCancel}
          className='mr-4'
          titleText={i18n.t('cert-app.Common.Cancel')}
          size='lg'
          variant='secondary'/>}
        <Button
          variant="primary"
          size="lg"
          disabled={disabled}
          onClick={this.onClick}
          titleText={this.renderText()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pageStatus: getPageStatus(state, 'examDetails'),
  mcPageStatus: getPageStatusByForm(state,'examDetails',['email','address','phone','location']),
  submitAppInitiated: getSubmitAppInitiatedFlag(state),
  applicationData: getApplication(state),
  applicationStatus: getApplicationStatus(state),
});

const mapDispatchToProps = dispatch => ({
  resetSubmitAppInitiated: () => dispatch(uiActions.resetSubmitAppInitiated()),
  submitApplicationForReview: (data) => dispatch(applicationActions.submitApplication(data)),
  submitExamDetails: (data) => dispatch(examActions.submitExamDetail(data)),
  showLoader: () => dispatch(loaderActions.showPageLoader()),
  hideLoader: () => dispatch(loaderActions.hidePageLoader()),
});

const examDetailsSubmitButton = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExamDetailsSubmitButton));

export default examDetailsSubmitButton;
