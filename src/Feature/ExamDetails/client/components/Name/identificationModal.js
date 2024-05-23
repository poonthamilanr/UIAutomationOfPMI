
import React from 'react';
import i18n from 'i18next';
import { Modal } from 'react-bootstrap';
import { Button } from '@pmi/dsm-react-bs4';
import { RichText, Text } from '@sitecore-jss/sitecore-jss-react';
import 'assets/styles/modal.scss';

const IdentificationFormsModal = props => {
  const { identificationModal } = props;

  return  (
    <Modal
      {...props}
      size="lg"
      dialogClassName="dsm"
      centered
      aria-labelledby="identificationFormsModalTitle"
      aria-describedby="identificationFormsModalDesc"
    >
      <Modal.Header closeButton>
        <Modal.Title id="identificationFormsModalTitle">
          {identificationModal && <Text field={identificationModal.title} />}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body id="identificationFormsModalDesc">
        {identificationModal && <RichText field={identificationModal.body} />}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} titleText={i18n.t('cert-app.Common.Close')} />
      </Modal.Footer>
    </Modal>
  );
};

export default IdentificationFormsModal;

