import React from 'react';
import { Row, Col } from 'react-bootstrap';
import i18n from 'i18next';
import { LinkButton } from '@pmi/dsm-react-bs4';
import { ReactComponent as CircleAlertIcon } from '@pmi/dsm-react-bs4/dist/assets/icons/16/circle-alert.svg';
import { ReferenceStatus } from './ReferenceStatus';
import ReferenceResendReminder from './ReferenceResendReminder';
import AuditDocumentDownloadView from './AuditDocumentDownloadView';
import { ONE_DAY_IN_MS, DAYS_BEFORE_REF_REQ_REMINDER_DEFAULT } from './constants';

import './styles.scss';

class ExperienceReferenceView extends React.PureComponent {
  getDaysSinceLastUpdateDate(referenceRequest) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastUpdateDate = new Date(referenceRequest?.lastUpdateDate);
    lastUpdateDate.setHours(0, 0, 0, 0);

    return Math.ceil((today.getTime() - lastUpdateDate.getTime()) / ONE_DAY_IN_MS);
  }

  handleUpdateReferenceClick = () => {
    this.props.handleUpdateReferenceStateChange({ value: true });
  };

  render() {
    const {
      sitecoreSettings,
      auditDocumentId,
      auditDocument,
      referenceRequest,
      referenceStatus,
      isAdminView,
    } = this.props;

    if (!referenceRequest) return <div className="static-height" />;

    const daysBeforeReferenceRequestReminder =
      sitecoreSettings?.auditSettings?.daysBeforeReferenceRequestReminderDisplayed?.value ??
      DAYS_BEFORE_REF_REQ_REMINDER_DEFAULT;

    const daysSinceRequest =
      referenceStatus === ReferenceStatus.RequestReceived ? this.getDaysSinceLastUpdateDate(referenceRequest) : 0;

    const showResendRequestMessage =
      !isAdminView &&
      referenceStatus === ReferenceStatus.RequestReceived &&
      daysSinceRequest >= daysBeforeReferenceRequestReminder;

    const deliveryFailed = referenceStatus === ReferenceStatus.DeliveryFailed;

    const showUpdateLink =
      !isAdminView && [ReferenceStatus.RequestReceived, ReferenceStatus.DeliveryFailed].includes(referenceStatus);

    return (
      <>
        <Row>
          <Col xs={12} md={4} className="mb-3">
            <small>{i18n.t('cert-app.Audit.Experience.ReferenceFullName')}</small>
            <div>
              <strong>{referenceRequest.referenceName}</strong>
            </div>
          </Col>
          <Col xs={12} md={5} className="mb-3">
            <small className={deliveryFailed ? 'experienceStatus-referenceNeeded' : null}>
              {i18n.t('cert-app.Audit.Experience.ReferenceEmail')}
              {deliveryFailed && (
                <>
                  &nbsp;
                  <CircleAlertIcon className="circle-alert-icon" />
                </>
              )}
            </small>
            <div className={deliveryFailed ? 'experienceStatus-referenceNeeded' : null}>
              <strong>{referenceRequest.referenceEmail}</strong>
            </div>
          </Col>
          <Col xs={12} md={3} className="mb-3">
            {showUpdateLink ? (
              <LinkButton
                size="xs"
                className="linkBtn text-right"
                titleText={i18n.t('cert-app.Audit.Experience.UpdateReference')}
                onClick={this.handleUpdateReferenceClick}
              />
            ) : null}
          </Col>
        </Row>
        {deliveryFailed && (
          <Row>
            <Col xs={12} className="experienceStatus-referenceNeeded">
              {i18n.t('cert-app.Audit.Experience.ReferenceEmailDeliveryFailed')}
            </Col>
          </Row>
        )}
        {isAdminView && (
          <AuditDocumentDownloadView
            key={auditDocumentId}
            auditDocumentId={auditDocumentId}
            applicationId={auditDocument.applicationId}
            referenceExperienceId={auditDocument.objectId}
          />
        )}
        {showResendRequestMessage && (
          <Row>
            <Col xs={12}>
              <ReferenceResendReminder
                daysSinceRequest={daysSinceRequest}
                referenceRequest={referenceRequest}
                auditDocumentId={auditDocumentId}
                handleResendRequestCompleted={this.props.handleResendRequestCompleted}
              />
            </Col>
          </Row>
        )}
      </>
    );
  }
}

export default ExperienceReferenceView;
