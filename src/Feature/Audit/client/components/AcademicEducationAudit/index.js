import React from 'react';
import { connect } from 'react-redux';
import { getListsSettings } from 'foundation/SitecoreSettings/client/accessors';
import { getAcademicEducation, getApplication, isAdminView } from 'foundation/Application/client/Application/accessors';
import { getAuditDocument, getIsSavingStatus } from 'foundation/Application/client/AuditDocument/accessors';
import { getEnumDisplayName } from 'foundation/SitecoreSettings/client/utils';
import { Row, Col, Button } from 'react-bootstrap';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import MobileAwareComponent from 'feature/PageComponents/client/components/MobileAwareComponent';
import AuditDocumentView from 'feature/Audit/client/components/EducationUploadAudit/view';
import EducationUploadAuditModal from 'feature/Audit/client/components/EducationUploadAudit';
import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import { ReactComponent as DownloadIcon } from '../../../../../Project/Certification/client/assets/icons/upload.svg';
import SectionAccordion from '../SectionAccordion';
import './educationAudit.scss';

class AcademicEducationAudit extends MobileAwareComponent {
  auditDocumentView(auditDocument, fields, fileName, disabled, isViewMode) {
    return (
      <AuditDocumentView
        key={auditDocument._links.self.href}
        auditDocument={auditDocument}
        fields={fields.UploadModal.fields}
        fileName={fileName}
        disabled={disabled}
        isViewMode={isViewMode}
      />
    );
  }

  state = {
    isOpen: false,
  };

  handleShow = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  sectionHeader = (fields, docUploadInfo, startOpen) => {
    return (
      <>
        <h2 className={startOpen ? '' : 'collapsed'}>
          <Text field={fields.Heading} />
        </h2>
        <p className="educationInfohighlight">
          {isPageSimulation() ? <Text field={fields.DocUploadInfo} /> : docUploadInfo}
        </p>
        <p>
          <Text field={fields.Description} />
        </p>
      </>
    );
  };

  educationCard = (
    fields,
    sitecoreListsSettings,
    auditDocument,
    saving,
    isUploaded,
    degreeEnum,
    schoolName,
    isDegreeProgram,
    accreditedUniversityDegree,
    fieldOfStudyEnum,
    yearOfDegree,
    yearStarted,
    isAdminView // eslint-disable-line comma-dangle
  ) => {
    return (
      <>
        <div className="educationInfoBox">
          <Row>
            <Col sm={9}>
              <span className="fontBold fontSmall">
                {getEnumDisplayName(sitecoreListsSettings.AcademicEducationLevels, degreeEnum)}
              </span>{' '}
              <br />
              <span className="fontBold">{schoolName} </span>
              <br />
              <span>
                {isDegreeProgram
                  ? accreditedUniversityDegree && accreditedUniversityDegree.name
                  : getEnumDisplayName(sitecoreListsSettings.FieldOfStudy, fieldOfStudyEnum)}
              </span>{' '}
              <br />
              <span>{yearOfDegree && [yearStarted, yearOfDegree].filter(v => v).join(' - ')}</span> <br />
            </Col>
            <Col sm={3}>
              {!isUploaded && !isAdminView ? (
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
          {isUploaded ? this.auditDocumentView(auditDocument[0], fields, schoolName, saving, isAdminView) : ''}
        </div>
      </>
    );
  };

  render() {
    const {
      fields,
      academicEducation,
      sitecoreListsSettings,
      applicationData,
      auditDocumentArray,
      saving,
      isAdminView,
    } = this.props;
    const { isOpen } = this.state;
    if (
      applicationData === null ||
      applicationData === undefined ||
      sitecoreListsSettings === null ||
      auditDocumentArray === null ||
      auditDocumentArray === undefined ||
      auditDocumentArray.length === 0 ||
      academicEducation === null
    ) {
      return null;
    }
    const {
      degreeEnum,
      schoolName,
      fieldOfStudyEnum,
      yearStarted,
      yearOfDegree,
      accreditedUniversityDegree,
    } = academicEducation;
    const isDegreeProgram = academicEducation.accreditedUniversityDegreeId;
    if (!fields) return <div className="static-height" />;
    const auditDocument = auditDocumentArray.filter(auditDoc => auditDoc.auditDocumentTypeEnum === 'AcademicEducation');
    fields.DocUploadInfo.value = fields.DocUploadInfo.value.replace('$total', 1);
    const isUploaded = auditDocument.filter(auditDoc => auditDoc.documentReceived).length > 0;
    const docUploadInfo = fields.DocUploadInfo.value.replace(
      '$uploaded',
      auditDocument.filter(auditDoc => auditDoc.documentReceived).length // eslint-disable-line comma-dangle
    );
    return (
      /* eslint-disable indent */
      <>
        {this.isMobile() ? (
          <SectionAccordion
            id="acad-edu-accord"
            startOpen={!isUploaded}
            showHeader={() => this.sectionHeader(fields, docUploadInfo, !isUploaded)}
            showBody={() =>
              this.educationCard(
                fields,
                sitecoreListsSettings,
                auditDocument,
                saving,
                isUploaded,
                degreeEnum,
                schoolName,
                isDegreeProgram,
                accreditedUniversityDegree,
                fieldOfStudyEnum,
                yearOfDegree,
                yearStarted,
                isAdminView // eslint-disable-line comma-dangle
              )
            } // eslint-disable-line react/jsx-curly-newline
          />
        ) : (
          <>
            <Row className="educationPanel border-bottom">
              <Col md={4}>{this.sectionHeader(fields, docUploadInfo)}</Col>
              <Col md={8}>
                {this.educationCard(
                  fields,
                  sitecoreListsSettings,
                  auditDocument,
                  saving,
                  isUploaded,
                  degreeEnum,
                  schoolName,
                  isDegreeProgram,
                  accreditedUniversityDegree,
                  fieldOfStudyEnum,
                  yearOfDegree,
                  yearStarted,
                  isAdminView // eslint-disable-line comma-dangle
                )}
              </Col>
            </Row>
          </>
        )}
        <EducationUploadAuditModal
          show={isOpen}
          onHide={this.handleClose}
          auditDocument={auditDocument[0]}
          fields={fields.UploadModal.fields}
        />
      </>
      /* eslint-enable indent */
    );
  }
}

const mapStateToProps = state => ({
  applicationData: getApplication(state),
  saving: getIsSavingStatus(state),
  academicEducation: getAcademicEducation(state),
  auditDocumentArray: getAuditDocument(state),
  sitecoreListsSettings: getListsSettings(state),
  isAdminView: isAdminView(state),
});
export default connect(
  mapStateToProps,
  null // eslint-disable-line comma-dangle
)(AcademicEducationAudit);
