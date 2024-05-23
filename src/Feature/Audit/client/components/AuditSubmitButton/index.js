import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@pmi/dsm-react-bs4';
import { Row, Col } from 'react-bootstrap';
import { Text, Link } from '@sitecore-jss/sitecore-jss-react';
import * as applicationActions from 'foundation/Application/client/Application/actions';
import { getApplicationStatus, isAuditSubmitted, isAdminView } from 'foundation/Application/client/Application/accessors';
import * as loaderActions from 'foundation/FormFields/client/components/PageLoader/actions';
import { ApiStatus } from 'foundation/CertificationApiCore/client/constants';
import { getAuditDocument } from 'foundation/Application/client/AuditDocument/accessors';
import './auditSubmit.scss';

class AuditSubmitButton extends React.Component {
  isSubmitting() {
    const { applicationStatus } = this.props;
    const applicationSubmitting = applicationStatus === ApiStatus.Submitting;
    return applicationSubmitting;
  }

  onClick = () => {
    this.submitApplication();
  };

  submitApplication = () => {
    const { submitAuditApplication, showLoader, history } = this.props;

    if (this.canSubmit()) {
      showLoader();
      submitAuditApplication({ history });
    } else {
      console.log('Error: upload and reference should be completed before submit');
    }
  };

  canSubmit = () => {
    const { auditDocumentArray } = this.props;
    const nonReceivedDoc = auditDocumentArray.filter(auditDoc =>
      (auditDoc.auditDocumentTypeEnum === "AcademicEducation" || auditDoc.auditDocumentTypeEnum === "ProfessionalEducation") && !auditDoc.documentReceived);
    const nonReferenceDoc = auditDocumentArray.filter(doc => doc.auditDocumentTypeEnum === 'ProfessionalExperience' &&
    (doc.auditReferenceRequest === null || doc.auditReferenceRequest.auditReferenceRequestStatus !== 'Completed'));
    if(nonReceivedDoc.length === 0 && nonReferenceDoc.length === 0)
    {
      return true;
    }
    return false;
  };

  render() {
    const { fields, hideLoader, isAuditSubmitted, auditDocumentArray, isAdminView } = this.props;
    if(auditDocumentArray === null || auditDocumentArray === undefined || auditDocumentArray.length === 0 || fields === null || fields === undefined ||
      fields.NavLink === null || fields.NavLink === undefined)
    {
      return null;
    }
    const disabled = !this.canSubmit() || this.isSubmitting();
    if (isAdminView) {
      return null;
    }
    if (isAuditSubmitted) {
      hideLoader();
      return (
        <Row className="mt-5">
          <Col md={4} className="mb-2" />
          <Col md={6}>
            <Link
              href={fields.NavLink.value.href}
              title={fields.NavLink.value.text}
              text={fields.NavLink.value.text}
              field={fields.NavLink}
              className="backnav-link"
            />
          </Col>
        </Row>
      );
    }
    return (
      <>
        <Row>
          <Col md={4} className="mb-2" />
          <Col md={8}>
            <span className="info-style"><Text field={fields.SubmitInfo} /></span>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={4} className="mb-2" />
          <Col md={6}>
            <Link
              href={fields.NavLink.value.href}
              title={fields.NavLink.value.text}
              text={fields.NavLink.value.text}
              field={fields.NavLink}
              className="backnav-link"
            />
          </Col>
          <Col md={2} className="audit-submit-row">
            <Button
              variant="primary"
              size="lg"
              disabled={disabled}
              onClick={this.onClick}
              titleText={fields.Title.value}
            />
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = state => ({
  auditDocumentArray: getAuditDocument(state),
  applicationStatus: getApplicationStatus(state),
  isAuditSubmitted: isAuditSubmitted(state),
  isAdminView: isAdminView(state),
});

const mapDispatchToProps = dispatch => ({
  submitAuditApplication: data => dispatch(applicationActions.submitAuditApplication(data)),
  showLoader: () => dispatch(loaderActions.showPageLoader()),
  hideLoader: () => dispatch(loaderActions.hidePageLoader()),
});

const auditSubmitButton = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuditSubmitButton));

export default auditSubmitButton;
