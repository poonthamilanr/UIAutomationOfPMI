import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import i18n from 'i18next';
import ExperienceReferenceView from './ExperienceReferenceView';
import ExperienceReferenceEdit from './ExperienceReferenceEdit';
import { ReferenceStatus, getReferenceStatus } from './ReferenceStatus';
import './styles.scss';

class ExperienceAuditCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isUpdateMode: false,
    };
  }

  getDisplayDate(value, includeDay = false) {
    const { sitecoreListsSettings } = this.props;
    const date = new Date(value);
    const month = value ? sitecoreListsSettings.Months[date.getMonth()].displayName.substring(0, 3) : '';
    const year = date.getFullYear();

    if (includeDay) {
      const day = date.getDate();
      return `${month} ${day}, ${year}`;
    }
    return `${month} ${year}`;
  }

  getDisplayDatePeriod(dateFrom, dateTo) {
    if (!dateFrom || !dateTo) {
      return null;
    }

    return `${this.getDisplayDate(dateFrom)} - ${this.getDisplayDate(dateTo)}`;
  }

  getReferenceStatusDisplay(status) {
    /* eslint-disable indent */
    switch (status) {
      case ReferenceStatus.ResponseProvided:
        return (
          <strong className="experienceStatus-responseProvided">
            {i18n.t('cert-app.Audit.Experience.ResponseProvided')}
          </strong>
        );
      case ReferenceStatus.RequestReceived:
        return (
          <strong className="experienceStatus-waitingForResponse">
            {i18n.t('cert-app.Audit.Experience.WaitingForResponse')}
          </strong>
        );
      default:
        return (
          <strong className="experienceStatus-referenceNeeded">
            {i18n.t('cert-app.Audit.Experience.ReferenceNeeded')}
          </strong>
        );
    }
    /* eslint-enable indent */
  }

  getReferenceStatusDateMessage(status, date) {
    /* eslint-disable indent */
    switch (status) {
      case ReferenceStatus.ResponseProvided:
        return (
          <span>
            {i18n.t('cert-app.Audit.Experience.ReceivedOn')} {this.getDisplayDate(date, true)}
          </span>
        );
      case ReferenceStatus.RequestReceived:
        return (
          <span>
            {i18n.t('cert-app.Audit.Experience.RequestSentOn')} {this.getDisplayDate(date, true)}
          </span>
        );
      default:
        return null;
    }
    /* eslint-enable indent */
  }

  getIsEditMode(status, isUpdateMode, isAdminView) {
    if (isAdminView) return false;

    /* eslint-disable indent */
    switch (status) {
      case ReferenceStatus.ResponseProvided:
        return false;
      case ReferenceStatus.RequestReceived:
      case ReferenceStatus.DeliveryFailed:
        return isUpdateMode;
      default:
        return true;
    }
    /* eslint-enable indent */
  }

  handleUpdateReferenceStateChange = e => {
    this.setState({ isUpdateMode: e.value });
  };

  onSendingRequest = isSending => {
    this.props.onSendingRequest(isSending);
  }

  render() {
    const { sitecoreSettings, experience, auditDocumentId, auditDocument, isAdminView } = this.props;
    if (!experience || !auditDocument) return <div className="static-height" />;

    const { isUpdateMode } = this.state;

    const referenceRequest = auditDocument.auditReferenceRequest;
    const referenceStatus = getReferenceStatus(referenceRequest);
    const isEditMode = this.getIsEditMode(referenceStatus, isUpdateMode, isAdminView);

    return (
      <>
        <Card className="experienceInfoBox mb-4">
          <Card.Header className="pt-3">
            <Row>
              <Col className="d-flex justify-content-between">
                <strong>{experience.projectTitle}</strong>
                <span className="text-right">{this.getReferenceStatusDisplay(referenceStatus)}</span>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-between">
                <span>{this.getDisplayDatePeriod(experience.startDate, experience.endDate)}</span>
                <span className="text-right">
                  {this.getReferenceStatusDateMessage(referenceStatus, referenceRequest?.lastUpdateDate)}
                </span>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            {isEditMode ? (
              <ExperienceReferenceEdit
                isUpdateMode={isUpdateMode}
                referenceRequest={referenceRequest}
                auditDocumentId={auditDocumentId}
                sitecoreSettings={sitecoreSettings}
                handleUpdateReferenceStateChange={this.handleUpdateReferenceStateChange}
                onSendingRequest={this.onSendingRequest}
              />
            ) : (
              <ExperienceReferenceView
                isAdminView={isAdminView}
                referenceRequest={referenceRequest}
                referenceStatus={referenceStatus}
                auditDocumentId={auditDocumentId}
                auditDocument={auditDocument}
                sitecoreSettings={sitecoreSettings}
                handleUpdateReferenceStateChange={this.handleUpdateReferenceStateChange}
              />
            )}
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default ExperienceAuditCard;
