import React from 'react';
import { connect } from 'react-redux';
import { getApplication, isAdminView } from 'foundation/Application/client/Application/accessors';
import { getListsSettings } from 'foundation/SitecoreSettings/client/accessors';
import { getAuditDocument } from 'foundation/Application/client/AuditDocument/accessors';
import { Row, Col } from 'react-bootstrap';
import { Text, Link } from '@sitecore-jss/sitecore-jss-react';
import ProgressBar from 'feature/PageComponents/client/components/ProgressBar';
import { getCertType } from "foundation/Application/client/certtype-storage";
import { getGlobalSettings } from 'foundation/SitecoreSettings/client/accessors';
import i18n from 'i18next';
import './auditBanner.scss';
import Clock from 'foundation/Icon/client/clock';
import Document from 'foundation/Icon/client/document';

class AuditBanner extends React.Component {
  getDisplayDate(value) {
    const { sitecoreListsSettings } = this.props;
    const date = new Date(value);
    const month = value ? sitecoreListsSettings.Months[date.getMonth()].displayName.substring(0, 3) : '';
    const year = date.getFullYear();
    return `${month} ${date.getDate()}, ${year}`;
  }

  getPercentage(progress, total) {
    const val = progress / total;
    return val * 100;
  }

  getNumberOfDaysRemaining(auditDueDate) {
    const todayDate = new Date();
    return this.getDaysRemaining(todayDate, auditDueDate);
  }

  getDaysRemaining(start, end) {
    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;
    const endDateFormat = new Date(end);
    const startDateFormat = new Date(start);
    startDateFormat.setHours(0, 0, 0, 0);

    if (endDateFormat > startDateFormat) {
      // Calculating the time difference between two dates
      const diffInTime = endDateFormat.getTime() - startDateFormat.getTime();
      // Calculating the no. of days between two dates
      const diffInDays = Math.floor(diffInTime / oneDay);
      return diffInDays;
    }
    return 0;
  }

  daysRemainingPercentage(auditDueDate, auditOpenDate) {
    const daysRemaining = this.getNumberOfDaysRemaining(auditDueDate);
    if (daysRemaining > 0) {
      const totalAuditDays = this.getDaysRemaining(auditOpenDate, auditDueDate);
      return this.getPercentage(daysRemaining, totalAuditDays);
    }
    return 0;
  }

  render() {
    const { fields, applicationData, sitecoreListsSettings, auditDocumentArray, isAdminView, sitecoreSettings } = this.props;
    if (
      applicationData === null ||
      applicationData === undefined ||
      !sitecoreListsSettings || !sitecoreSettings ||
      auditDocumentArray === null ||
      auditDocumentArray === undefined ||
      auditDocumentArray.length === 0
    ) {
      return null;
    }
    if (!fields) return <div className="static-height" />;
    const certType = getCertType();
    const certification = sitecoreSettings.certTypes.find(cert => cert.name && (cert.name.toLowerCase() === certType.toLowerCase()));
    const certificationShortTitle = certification ? certification.shortTitle.value : applicationData.certificationTypeAsText;
    const hideDocumentsProgressBar = fields.HideDocumentsProgressBar?.value;
    const totalDocument =  auditDocumentArray.filter(auditDoc => auditDoc.auditDocumentTypeEnum === "AcademicEducation" || auditDoc.auditDocumentTypeEnum === "ProfessionalEducation");
    const receivedDocument = totalDocument.filter(auditDoc => auditDoc.documentReceived);
    const totalReferenceDocument = auditDocumentArray.filter(doc => doc.auditDocumentTypeEnum === 'ProfessionalExperience');
    const remainingAudiDays = this.getNumberOfDaysRemaining(applicationData.dateAuditDue);
    const totalReferenceCompleted = totalReferenceDocument.filter(doc => doc.auditReferenceRequest !== null &&
      (doc.auditReferenceRequest.auditReferenceRequestStatus === 'Completed' || doc.auditReferenceRequest.auditReferenceRequestStatus === 'Declined'));
    return (
      <>
        <Row>
          <Col md={12}>
            {!isAdminView && (
              <Link
                href={fields.BackPmi.value.href}
                title={fields.BackPmi.value.text}
                text={fields.BackPmi.value.text}
                field={fields.BackPmi}
                className="auditBanner__backnav-link"
              />
            )}
          </Col>
        </Row>
        <Row className="auditBanner border-bottom">
          <Col md={6}>
            <div className="auditBanner__left-panel">
              <div className="auditBanner__audit-header">
                <Text field={fields.Heading} />
              </div>
              <h2>{applicationData.nameToBeOnApplication}</h2>
              <strong>
                {certificationShortTitle} <Text field={fields.ApplicationLabel} /> |{' '}
              </strong>
              <a
                href={applicationData.applicationDownloadPdfUrl}
                className="auditBanner__backnav-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text field={fields.ViewApplicationLabel} />
              </a>
              <br />
              <Document />
              <Text field={fields.ApplicationSubmittedLabel} /> {this.getDisplayDate(applicationData.dateSubmitted)}
              <br />
              <Clock />
              <Text field={fields.LastDayLabel} /> {this.getDisplayDate(applicationData.dateAuditDue)}
            </div>
          </Col>
          <Col md={6}>
            <Row>
              {!hideDocumentsProgressBar &&
                <>
                  <Col md={12}>
                    <div className="auditBanner__audit-box">
                      <div className="auditBanner__infoPanel">
                        <Row>
                          <Col md={8}>
                            <span className="auditBanner__highlight">
                              {receivedDocument.length} {i18n.t('cert-app.Common.Of')} {totalDocument.length}
                            </span>{' '}
                            <Text field={fields.DocumentsProvidedLabel} />
                          </Col>
                          <Col md={4} className="auditBanner__progressBar">
                            <ProgressBar
                              bgcolor="#0080A8"
                              completed={this.getPercentage(receivedDocument.length, totalDocument.length)}
                            />
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                  <Col md={12}>
                    <hr className="mt-2 mb-0" />
                  </Col>
                </>}
              {totalReferenceDocument.length > 0 &&
                <>
                  <Col md={12}>
                    <div className="auditBanner__audit-box">
                      <div className="auditBanner__infoPanel">
                        <Row>
                          <Col md={8}>
                            <span className="auditBanner__highlight">
                              {totalReferenceCompleted.length} {i18n.t('cert-app.Common.Of')}{' '}
                              {totalReferenceDocument.length}
                            </span>{' '}
                            <Text field={fields.ReferencesCompletedLabel} />
                          </Col>
                          <Col md={4} className="auditBanner__progressBar">
                            <ProgressBar
                              bgcolor="#0080A8"
                              completed={this.getPercentage(totalReferenceCompleted.length, totalReferenceDocument.length)}
                            />
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                  <Col md={12}>
                    <hr className="mt-2 mb-0" />
                  </Col>
                </>}
              <Col md={12}>
                <div className="auditBanner__audit-box">
                  <div className="auditBanner__infoPanel">
                    <Row>
                      <Col md={8}>
                        <span className="auditBanner__highlight">
                          {remainingAudiDays}{' '}
                          {remainingAudiDays === 1
                            ? i18n.t('cert-app.Common.Day')
                            : i18n.t('cert-app.Common.DaysLabel')}
                        </span>{' '}
                        <Text field={fields.DaysProgressLabel} />
                      </Col>
                      <Col md={4} className="auditBanner__progressBar">
                        <ProgressBar
                          bgcolor="#FF610F"
                          completed={this.daysRemainingPercentage(applicationData.dateAuditDue, applicationData.dateAuditOpened)}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = state => ({
  applicationData: getApplication(state),
  auditDocumentArray: getAuditDocument(state),
  sitecoreListsSettings: getListsSettings(state),
  isAdminView: isAdminView(state),
  sitecoreSettings: getGlobalSettings(state),
});

export default connect(mapStateToProps, null)(AuditBanner);
