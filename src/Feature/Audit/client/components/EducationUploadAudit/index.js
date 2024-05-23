import React from 'react';
import { Modal } from 'react-bootstrap';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import 'assets/styles/modal.scss';
import FileDropZone from 'feature/Audit/client/components/FileDropZone';

const EducationUploadAuditModal = props => {
  const {  show, onHide, auditDocument, fields } = props;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      dialogClassName="dsm"
      centered
      aria-labelledby="EducationUploadAuditModalTitle"
      aria-describedby="EducationUploadAuditModalDesc"
    >
      <Modal.Header closeButton>
        <Modal.Title id="EducationUploadAuditModalTitle">
          <Text field={fields.Header} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body id="EducationUploadAuditModalDesc">
        <FileDropZone auditDocument={auditDocument} onClose={onHide} fields={fields} />
      </Modal.Body>
    </Modal>
  );
};


export default EducationUploadAuditModal;

