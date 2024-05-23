import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import i18n from 'i18next';
import { Button, LinkButton, TextInput, TextArea } from '@pmi/dsm-react-bs4';
import * as apiActions from 'foundation/Application/client/AuditDocument/actions';
import { MAX_REF_NOTE_CHAR_COUNT_DEFAULT } from './constants';
import './styles.scss';

class ExperienceReferenceEdit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sending: false,
      auditDocumentId: this.props.auditDocumentId,
      referenceName: this.props.referenceRequest?.referenceName ?? '',
      referenceNameValidationMessage: '',
      referenceEmail: this.props.referenceRequest?.referenceEmail ?? '',
      referenceEmailValidationMessage: '',
      referenceNote: this.props.referenceRequest?.referenceNote ?? '',
      referenceNoteCharacterCount: this.getReferenceNoteCharacterCount(this.props.referenceRequest?.referenceNote),
    };
  }

  getReferenceNoteCharacterCount = value => {
    if (!value) return 0;
    return value.length;
  };

  handleReferenceNameChange = e => {
    this.setState({ referenceName: e.target.value });
  };

  handleReferenceEmailChange = e => {
    this.setState({ referenceEmail: e.target.value });
  };

  handleReferenceNoteChange = e => {
    this.setState({
      referenceNote: e.target.value,
      referenceNoteCharacterCount: this.getReferenceNoteCharacterCount(e.target.value),
    });
  };

  validationSchema = Yup.object().shape({
    referenceName: Yup.string().required(i18n.t('cert-app.Audit.Experience.ReferenceFullNameRequired')),
    referenceEmail: Yup.string()
      .email(i18n.t('cert-app.Audit.Experience.ReferenceEmailNotValid'))
      .required(i18n.t('cert-app.Audit.Experience.ReferenceEmailRequired')),
  });

  ValidateForm = async () => {
    const { referenceName, referenceEmail } = this.state;
    let referenceNameValidationMessage = '';
    let referenceEmailValidationMessage = '';

    try {
      await this.validationSchema.validate(
        {
          referenceName,
          referenceEmail,
        },
        { abortEarly: false } // eslint-disable-line comma-dangle
      );
      return true;
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach(err => {
          /* eslint-disable indent, default-case */
          switch (err.path) {
            case 'referenceName':
              referenceNameValidationMessage = err.message;
              break;
            case 'referenceEmail':
              referenceEmailValidationMessage = err.message;
              break;
          }
          /* eslint-enable indent, default-case */
        });
      }
      return false;
    } finally {
      this.setState({ referenceNameValidationMessage, referenceEmailValidationMessage });
    }
  };

  handleSendButtonClick = async () => {
    this.onSendingRequest(true);

    const isValid = await this.ValidateForm();
    if (!isValid) {
      this.onSendingRequest(false);
      return;
    }

    const { auditDocumentId, referenceName, referenceEmail, referenceNote } = this.state;

    const params = {
      onSuccess: this.onSendRequestSuccess,
      auditDocumentId,
      referenceName,
      referenceEmail,
      referenceNote,
    };

    this.props.postAuditReference(params);
  };

  handleCancelButtonClick = () => {
    this.props.handleUpdateReferenceStateChange({ value: false });
  };

  onSendRequestSuccess = () => {
    this.onSendingRequest(false);
    this.props.handleUpdateReferenceStateChange({ value: false });
  };

  onSendingRequest = isSending => {
    this.setState({ sending: isSending });
    this.props.onSendingRequest(isSending);
  };

  render() {
    const {
      auditDocumentId,
      referenceName,
      referenceNameValidationMessage,
      referenceEmail,
      referenceEmailValidationMessage,
      referenceNote,
      referenceNoteCharacterCount,
      sending,
    } = this.state;

    const { sitecoreSettings, isUpdateMode } = this.props;
    const maxReferenceNoteCharCount =
      sitecoreSettings?.auditSettings?.maximumReferenceNoteCharacterCount?.value ?? MAX_REF_NOTE_CHAR_COUNT_DEFAULT;
    const charactersRemaining = Math.max(maxReferenceNoteCharCount - referenceNoteCharacterCount, 0);
    const canSubmit = !!referenceName && !!referenceEmail;

    return (
      <>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor={`referenceName-${auditDocumentId}`}>
                  {i18n.t('cert-app.Audit.Experience.ReferenceFullName')}
                </Form.Label>
                <TextInput
                  id={`referenceName-${auditDocumentId}`}
                  name="referenceName"
                  maxLength={100}
                  disabled={sending}
                  value={referenceName}
                  className={`${referenceNameValidationMessage ? 'is-invalid' : ''}`}
                  validationMessage={referenceNameValidationMessage}
                  onChange={this.handleReferenceNameChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor={`referenceEmail-${auditDocumentId}`}>
                  {i18n.t('cert-app.Audit.Experience.ReferenceEmail')}
                </Form.Label>
                <TextInput
                  id={`referenceEmail-${auditDocumentId}`}
                  name="referenceEmail"
                  maxLength={100}
                  disabled={sending}
                  value={referenceEmail}
                  className={`${referenceEmailValidationMessage ? 'is-invalid' : ''}`}
                  validationMessage={referenceEmailValidationMessage}
                  onChange={this.handleReferenceEmailChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group>
                <Row>
                  <Col className="d-flex justify-content-between">
                    <Form.Label htmlFor={`referenceNote-${auditDocumentId}`}>
                      {i18n.t('cert-app.Audit.Experience.NoteToReference')}
                    </Form.Label>
                    <small className="mb-0">
                      <span className="mr-1">{charactersRemaining}</span>
                      {i18n.t('cert-app.Common.CharactersRemaining')}
                    </small>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextArea
                      id={`referenceNote-${auditDocumentId}`}
                      name="referenceNote"
                      rows="5"
                      maxLength={maxReferenceNoteCharCount}
                      value={referenceNote}
                      disabled={sending}
                      onChange={this.handleReferenceNoteChange}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-between">
              {isUpdateMode && !sending ? (
                <LinkButton
                  size="xs"
                  className="linkBtn"
                  titleText={i18n.t('cert-app.Common.Cancel')}
                  onClick={this.handleCancelButtonClick}
                />
              ) : (
                <span />
              )}
              <Button
                titleText={i18n.t('cert-app.Audit.Experience.SendReferenceRequest')}
                variant="outline-primary"
                onClick={this.handleSendButtonClick}
                disabled={!canSubmit || sending}
              />
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  postAuditReference: data => dispatch(apiActions.postAuditReferenceRequest(data)),
});

export default connect(
  null,
  mapDispatchToProps // eslint-disable-line comma-dangle
)(ExperienceReferenceEdit);
