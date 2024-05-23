import React from 'react';
import Document from 'foundation/Icon/client/document';
import Close from 'foundation/Icon/client/close';
import { Row, Col } from 'react-bootstrap';
import 'feature/Audit/client/components/AcademicEducationAudit/educationAudit.scss';
import { Button as BaseButton } from 'react-bootstrap';
import { LinkButton } from '@pmi/dsm-react-bs4';
import { connect } from 'react-redux';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import * as auditAction from 'foundation/Application/client/AuditDocument/actions';

class AudiDocument extends React.PureComponent {
  handleDeleteClick = (auditDocument) => (e) => {
    e.preventDefault();
    e.disabled=true;
    this.props.deleteAudit(auditDocument);
  };

  handleDownloadClick = (auditDocument, updatedFileName) => (e) => {
    e.preventDefault();
    const param = {
      "audiDocument": auditDocument,
      "_links":auditDocument._links,
      "fileName": updatedFileName,
    }
    this.props.downlodAudit(param);
    return true;
  };

  render() {
    const { auditDocument, fileName, disabled, fields, isViewMode } = this.props;
    let updatedFileName = `${fileName} ${fields.FileFormatPostContent.value}`;
    if(auditDocument.documentMetadata !== null && auditDocument.documentMetadata.DocumentName !== undefined)
    {
      updatedFileName = auditDocument.documentMetadata.DocumentName;
    }
    if(isViewMode)
    {
      return (
        <Row className="docDownloadViewPanel">
          <Col md={12}>
            {updatedFileName}
            <BaseButton as="a" variant="link" href={auditDocument.url} download={updatedFileName} onClick={auditDocument.url === "" || auditDocument.url === undefined ? this.handleDownloadClick(auditDocument, updatedFileName) : ""} className="view-doc-link btn-md link-base"><Text field={fields.FileDownloadLink} /></BaseButton>
          </Col>
        </Row>
      )
    }
    return (
      <Row className="docDownloadPanel">
        <Col md={11}><BaseButton as="a" variant="link" href={auditDocument.url} download={updatedFileName} onClick={auditDocument.url === "" || auditDocument.url === undefined ? this.handleDownloadClick(auditDocument, updatedFileName) : ""} className="with-icon download_link btn-md link-base"><Document /> {updatedFileName}</BaseButton></Col>
        <Col md={1}>
          <LinkButton
            className="link-base remove_document"
            onClick={this.handleDeleteClick(auditDocument)}
            icon={Close}
            disabled={disabled}
          />
        </Col>
      </Row>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  deleteAudit: (data) => dispatch(auditAction.deleteAuditDocument(data)),
  downlodAudit: (data) => dispatch(auditAction.downloadAuditDocument(data)),
});

export default connect(null, mapDispatchToProps)(AudiDocument);
