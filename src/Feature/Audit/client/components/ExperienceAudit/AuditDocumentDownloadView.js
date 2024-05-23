import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button as BaseButton } from 'react-bootstrap';
import i18n from 'i18next';
import 'feature/Audit/client/components/AcademicEducationAudit/educationAudit.scss';
import * as auditAction from 'foundation/Application/client/AuditDocument/actions';

class AuditDocumentDownloadView extends React.PureComponent {
  handleDownloadClick = (applicationId, auditDocumentId, referenceExperienceId) => e => {
    e.preventDefault();
    const params = {
      onSuccess: this.onDownloadSuccess,
      applicationId,
      auditDocumentId,
      referenceExperienceId,
    };
    this.props.downloadReferenceDocument(params);
    return true;
  };

  onDownloadSuccess = (fileContents, referenceExperienceId) => {
    const blob = new Blob([fileContents], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${referenceExperienceId}.pdf`;
    link.style = 'display: none';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  render() {
    const { applicationId, auditDocumentId, referenceExperienceId } = this.props;

    return (
      <Row className="docDownloadViewPanel">
        <Col md={12}>
          {i18n.t('cert-app.Audit.Experience.ReferenceConfirmationDocument')}
          <BaseButton
            as="a"
            variant="link"
            className="view-doc-link btn-md link-base"
            onClick={this.handleDownloadClick(applicationId, auditDocumentId, referenceExperienceId)}
          >
            {i18n.t('cert-app.Audit.Experience.ViewDocument')}
          </BaseButton>
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  downloadReferenceDocument: data => dispatch(auditAction.downloadAuditReference(data)),
});

export default connect(
  null,
  mapDispatchToProps // eslint-disable-line comma-dangle
)(AuditDocumentDownloadView);
