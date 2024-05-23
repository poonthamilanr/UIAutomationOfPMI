import React from 'react';
import { connect } from 'react-redux';
import { getListsSettings, getGlobalSettings } from 'foundation/SitecoreSettings/client/accessors';
import { getAuditDocument } from 'foundation/Application/client/AuditDocument/accessors';
import {
  getApplication,
  getProfEducationResources,
  isAdminView,
} from 'foundation/Application/client/Application/accessors';
import { Row, Col } from 'react-bootstrap';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import MobileAwareComponent from 'feature/PageComponents/client/components/MobileAwareComponent';
import 'feature/Audit/client/components/AcademicEducationAudit/educationAudit.scss';
import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import ProfessionalEducationAuditView from './view';
import SectionAccordion from '../SectionAccordion';

class ProfessionalEducationAudit extends MobileAwareComponent {
  professionalEducationView(
    education,
    sitecoreSettings,
    sitecoreListsSettings,
    fields,
    professionalAuditDocument,
    isAdminView // eslint-disable-line comma-dangle
  ) {
    const objectId = education._links.self.href.substr(education._links.self.href.lastIndexOf('/') + 1);
    const auditDocument = professionalAuditDocument.filter(audit => Number(audit.objectId) === Number(objectId));
    return (
      <ProfessionalEducationAuditView
        key={education._links.self.href}
        education={education}
        sitecoreSettings={sitecoreSettings}
        sitecoreListsSettings={sitecoreListsSettings}
        fields={fields}
        auditDocument={auditDocument[0]}
        isViewMode={isAdminView}
      />
    );
  }

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
    sitecoreSettings,
    educationArray,
    professionalAuditDocument,
    isAdminView // eslint-disable-line comma-dangle
  ) => {
    return (
      <>
        {educationArray &&
          educationArray.map(
            education =>
              this.professionalEducationView(
                education,
                sitecoreSettings,
                sitecoreListsSettings,
                fields,
                professionalAuditDocument,
                isAdminView // eslint-disable-line comma-dangle
              ) // eslint-disable-line comma-dangle
          )}
      </>
    );
  };

  render() {
    const {
      fields,
      educationArray,
      sitecoreSettings,
      sitecoreListsSettings,
      applicationData,
      auditDocumentArray,
      isAdminView,
    } = this.props;
    if (
      applicationData === null ||
      applicationData === undefined ||
      sitecoreListsSettings === null ||
      auditDocumentArray === null ||
      auditDocumentArray === undefined ||
      auditDocumentArray.length === 0
    ) {
      return null;
    }
    if (!fields) return <div className="static-height" />;
    const professionalAuditDocument = auditDocumentArray.filter(
      auditDoc => auditDoc.auditDocumentTypeEnum === 'ProfessionalEducation' // eslint-disable-line comma-dangle
    );
    if (professionalAuditDocument === null || professionalAuditDocument.length === 0 || educationArray.length === 0) {
      return null;
    }
    const docReceived = professionalAuditDocument.filter(auditDoc => auditDoc.documentReceived);
    fields.DocUploadInfo.value = fields.DocUploadInfo.value.replace('$total', educationArray.length);
    const isUploaded = professionalAuditDocument.filter(auditDoc => auditDoc.documentReceived).length > 0;
    const docUploadInfo = fields.DocUploadInfo.value.replace('$uploaded', docReceived.length);

    return (
      /* eslint-disable indent */
      <>
        {this.isMobile() ? (
          <SectionAccordion
            id="prof-edu-accord"
            startOpen={!isUploaded}
            showHeader={() => this.sectionHeader(fields, docUploadInfo, !isUploaded)}
            showBody={() =>
              this.educationCard(
                fields,
                sitecoreListsSettings,
                sitecoreSettings,
                educationArray,
                professionalAuditDocument,
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
                  sitecoreSettings,
                  educationArray,
                  professionalAuditDocument,
                  isAdminView // eslint-disable-line comma-dangle
                )}
              </Col>
            </Row>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  applicationData: getApplication(state),
  educationArray: getProfEducationResources(state),
  auditDocumentArray: getAuditDocument(state),
  sitecoreListsSettings: getListsSettings(state),
  sitecoreSettings: getGlobalSettings(state),
  isAdminView: isAdminView(state),
});

export default connect(
  mapStateToProps,
  null // eslint-disable-line comma-dangle
)(ProfessionalEducationAudit);
