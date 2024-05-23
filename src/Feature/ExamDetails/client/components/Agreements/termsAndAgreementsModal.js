
import React from 'react';
import { connect } from 'react-redux';
import i18n from 'i18next';
import { Modal } from 'react-bootstrap';
import { Button } from '@pmi/dsm-react-bs4';
import { RichText, Text } from '@sitecore-jss/sitecore-jss-react';
import 'assets/styles/modal.scss';
import { getApplicationType } from 'foundation/Application/client/Application/accessors';
import { getGlobalSettings } from 'foundation/SitecoreSettings/client/accessors';

const TermsAndAgreementsModal = props => {
  const { applicationType, text, show, onHide, sitecoreSettings, title } = props;

  if (!sitecoreSettings) {
    return null;
  }

  if (!applicationType) {
    return null;
  }

  const applicationCertTypeItem = sitecoreSettings.certTypes
      && sitecoreSettings.certTypes.find(certType => certType.apiKey && (certType.apiKey.value === applicationType));
  const handBookJSSLink = applicationCertTypeItem && applicationCertTypeItem.handbookLink;

    if (!!text) { // eslint-disable-line
    text.value = text.value && text.value.replace('{handbookLink}', handBookJSSLink ? handBookJSSLink.url : '');
    text.value = text.value && text.value.replace('{certification}', applicationCertTypeItem ? applicationCertTypeItem.displayName : '');
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      dialogClassName="dsm"
      centered
      aria-labelledby="TermsAndAgreementsModalTitle"
      aria-describedby="TermsAndAgreementsModalDesc"
    >
      <Modal.Header closeButton>
        <Modal.Title id="TermsAndAgreementsModalTitle">
          <Text field={title} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body id="TermsAndAgreementsModalDesc">
        <RichText field={text} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} titleText={i18n.t('cert-app.Common.Close')}/>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = state => ({
  applicationType: getApplicationType(state),
  sitecoreSettings: getGlobalSettings(state),
})

export default connect(mapStateToProps)(TermsAndAgreementsModal);

