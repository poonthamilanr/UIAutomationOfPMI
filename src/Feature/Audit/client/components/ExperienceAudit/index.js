import React from 'react';
import { connect } from 'react-redux';
import i18n from 'i18next';
import { Row, Col } from 'react-bootstrap';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { Overlay } from '@pmi/dsm-react-bs4';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { getListsSettings, getGlobalSettings } from 'foundation/SitecoreSettings/client/accessors';
import {
  getApplication,
  getExperienceResources,
  isAdminView,
} from 'foundation/Application/client/Application/accessors';
import { getAuditDocument } from 'foundation/Application/client/AuditDocument/accessors';
import MobileAwareComponent from 'feature/PageComponents/client/components/MobileAwareComponent';
import { isReferenceProvided } from './ReferenceStatus';
import ExperienceAuditCard from './ExperienceAuditCard';
import SectionAccordion from '../SectionAccordion';
import { PROFESSIONAL_EXPERIENCE_DOC_TYPE } from './constants';
import './styles.scss';

class ExperienceAudit extends MobileAwareComponent {
  state = {
    sendingRequest: false,
  };

  getExperienceId(experience) {
    const id = /[^/experience/]*$/.exec(experience._links.self.href)[0];
    return parseInt(id, 10);
  }

  getAuditReferences(auditDocuments, experiences) {
    return auditDocuments.reduce((result, doc) => {
      const experienceId = doc.objectId;
      const auditDocumentId = doc.id;
      const exp = experiences.find(exp => this.getExperienceId(exp) === experienceId);
      if (exp) {
        result.push({ auditDocumentId, auditDocument: doc, experience: exp });
      }
      return result;
    }, []);
  }

  handleSendingRequest = isSending => {
    this.setState({ sendingRequest: isSending });
  };

  sectionHeader = (fields, referencesProvidedDisplay, startOpen) => {
    return (
      <>
        <h2 className={startOpen ? '' : 'collapsed'}>
          <Text field={fields.Heading} />
        </h2>
        <p className="experienceInfoHighlight">{referencesProvidedDisplay}</p>
        <p>
          <Text field={fields.Description} />
        </p>
      </>
    );
  };

  experienceCards = (auditReferences, sitecoreSettings, sitecoreListsSettings, isAdminView) => {
    return auditReferences.map(ref => {
      return (
        <ExperienceAuditCard
          key={ref.auditDocumentId}
          isAdminView={isAdminView}
          auditDocumentId={ref.auditDocumentId}
          experience={ref.experience}
          auditDocument={ref.auditDocument}
          sitecoreSettings={sitecoreSettings}
          sitecoreListsSettings={sitecoreListsSettings}
          onSendingRequest={this.handleSendingRequest}
        />
      );
    });
  };

  render() {
    const {
      fields,
      auditDocumentArray,
      experienceArray,
      sitecoreSettings,
      sitecoreListsSettings,
      applicationData,
      isAdminView, // eslint-disable-line comma-dangle
    } = this.props;

    if (
      applicationData === null ||
      auditDocumentArray === undefined ||
      experienceArray === undefined ||
      sitecoreListsSettings === null
    ) {
      return null;
    }
    if (!fields) return null;

    const workType = fields.Worktype?.fields?.ApiKey?.value;

    if (!workType) return null;

    const experiences = experienceArray.filter(exp => exp.workExperienceTypeEnum === workType);
    const auditDocuments = auditDocumentArray.filter(
      doc => doc.auditDocumentTypeEnum === PROFESSIONAL_EXPERIENCE_DOC_TYPE // eslint-disable-line comma-dangle
    );
    const auditReferences = this.getAuditReferences(auditDocuments, experiences);

    if (auditReferences.length === 0) return null;

    const referencesProvidedCount = auditReferences.filter(
      ref => isReferenceProvided(ref.auditDocument.auditReferenceRequest) // eslint-disable-line comma-dangle
    ).length;

    const needsReferences = referencesProvidedCount < auditReferences.length;

    const referencesProvidedDisplay = i18n
      .t('cert-app.Audit.Experience.NumberOfReferencesProvided')
      .replace('$referenced', referencesProvidedCount)
      .replace('$total', auditReferences.length);

    const { sendingRequest } = this.state;

    return (
      /* eslint-disable indent */
      <>
        {this.isMobile() ? (
          <SectionAccordion
            id={`exp-accord-${workType}`}
            startOpen={needsReferences}
            showHeader={() => this.sectionHeader(fields, referencesProvidedDisplay, needsReferences)}
            showBody={() => this.experienceCards(auditReferences, sitecoreSettings, sitecoreListsSettings, isAdminView)}
          />
        ) : (
          <Row className="experiencePanel border-bottom">
            <Col md={4} className="mb-2">
              {this.sectionHeader(fields, referencesProvidedDisplay)}
            </Col>
            <Col md={8}>
              {this.experienceCards(auditReferences, sitecoreSettings, sitecoreListsSettings, isAdminView)}
            </Col>
          </Row>
        )}
        <Overlay
          variant="PMIOverlay"
          iconColor="brand-dark"
          overlayColor="black"
          overlayOpacity={2}
          global={true}
          show={sendingRequest}
        />
      </>
      /* eslint-enable indent */
    );
  }
}

const mapStateToProps = state => ({
  isAdminView: isAdminView(state),
  auditDocumentArray: getAuditDocument(state),
  experienceArray: getExperienceResources(state),
  applicationData: getApplication(state),
  sitecoreListsSettings: getListsSettings(state),
  sitecoreSettings: getGlobalSettings(state),
});

export default withSitecoreContext()(connect(mapStateToProps)(ExperienceAudit));
