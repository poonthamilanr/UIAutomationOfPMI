import React from 'react';
import 'feature/Audit/client/components/AcademicEducationAudit/educationAudit.scss';
import AuditDocumentView from 'feature/Audit/client/components/EducationUploadAudit/view';
import EducationUploadAuditModal from 'feature/Audit/client/components/EducationUploadAudit';
import { Row, Col, Button } from 'react-bootstrap';
import { ReactComponent as DownloadIcon } from '../../../../../Project/Certification/client/assets/icons/upload.svg';

class ProfessionalEducationAuditView extends React.Component {
  state = {
    isOpen: false,
  };

  auditDocumentView(auditDocument, fields, fileName, isViewMode) {
    return (
      <AuditDocumentView
        key={auditDocument._links.self.href}
        auditDocument={auditDocument}
        fields={fields.UploadModal.fields}
        fileName={fileName}
        isViewMode={isViewMode}
      />
    );
  }

  handleShow = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  getDisplatDate(value) {
    const { sitecoreListsSettings } = this.props;
    const date = new Date(value);
    const month = value ? sitecoreListsSettings.Months[date.getMonth()].displayName.substring(0, 3) : '';
    const year = date.getFullYear();
    return `${month} ${year}`;
  }

  getDisplayDatePeriod(dateFrom, dateTo) {
    if (!dateFrom || !dateTo) {
      return null;
    }

    return `${this.getDisplatDate(dateFrom)} - ${this.getDisplatDate(dateTo)}`;
  }

  render() {
    const { fields, education, auditDocument, isViewMode } = this.props;
    const { isOpen } = this.state;
    if (!fields) return <div className="static-height" />;
    if (auditDocument === null || auditDocument === undefined) {
      return null;
    }
    const isUploaded = auditDocument.documentReceived;
    return (
      <>
        <div className="educationInfoBox mb-5">
          <Row>
            <Col sm={9}>
              <span className="fontBold">{education.courseTitle} </span>
              <br />
              <span>{education.institution}</span> <br />
              <span>
                {' '}
                {this.getDisplayDatePeriod(education.courseStartDate, education.courseEndDate)} | {education.hoursTotal}{' '}
                Hours
              </span>
              <br />
            </Col>
            <Col sm={3}>
              {!isUploaded && !isViewMode ? (
                <div className="dsm d-flex justify-content-end p-0">
                  <Button
                    as="a"
                    variant="link"
                    onClick={this.handleShow}
                    className="btn btn-link btn-md with-icon uploadBtn"
                  >
                    <div className="btn-icon uploadIcon">
                      <DownloadIcon />
                    </div>
                    <div>{fields.UploadLabel.value}</div>
                  </Button>
                </div>
              ) : (
                ''
              )}
            </Col>
          </Row>
          {isUploaded ? this.auditDocumentView(auditDocument, fields, education.institution, isViewMode) : ''}
        </div>
        <EducationUploadAuditModal
          show={isOpen}
          onHide={this.handleClose}
          auditDocument={auditDocument}
          fields={fields.UploadModal.fields}
        />
      </>
    );
  }
}

export default ProfessionalEducationAuditView;
