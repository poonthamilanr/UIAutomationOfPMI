
import React from 'react';
import i18n from 'i18next';
import { Modal } from 'react-bootstrap';
import { Button } from '@pmi/dsm-react-bs4';
import 'assets/styles/modal.scss';

const RemoveModal = ({ show, onHide, onRemove }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      dialogClassName="dsm"
      centered
      aria-labelledby="RemoveModalTitle"
      aria-describedby="RemoveModalDesc"
    >
      <Modal.Header closeButton>
        <Modal.Title id="RemoveModalTitle">
          {i18n.t('cert-app.Experience.ProgramExperience.RemoveProjectModalTitle')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body id="RemoveModalDesc" />
      <Modal.Footer>
        <Button variant="outline-primary" onClick={onHide} titleText={i18n.t('cert-app.Common.Cancel')} />
        <Button variant="primary" onClick={onRemove} titleText={i18n.t('cert-app.Experience.ProgramExperience.RemoveProject')} />
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveModal;

