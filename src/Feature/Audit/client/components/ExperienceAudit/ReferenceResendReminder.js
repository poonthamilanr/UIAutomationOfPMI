import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@pmi/dsm-react-bs4';
import i18n from 'i18next';
import * as apiActions from 'foundation/Application/client/AuditDocument/actions';

import './styles.scss';

class ReferenceResendReminder extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sending: false,
    };
  }

  handleSendButtonClick = () => {
    this.setState({ sending: true });

    const { auditDocumentId, referenceRequest } = this.props;
    const { referenceName, referenceEmail, referenceNote } = referenceRequest;

    const params = {
      onSuccess: this.onSendRequestSuccess,
      auditDocumentId,
      referenceName,
      referenceEmail,
      referenceNote,
    };

    this.props.postAuditReference(params);
  };

  onSendRequestSuccess = () => {
    this.setState({ sending: false });
  };

  render() {
    const { sending } = this.state;
    const { daysSinceRequest } = this.props;
    const resendRequestMessage = i18n.t('cert-app.Audit.Experience.ResendRequest').replace('$days', daysSinceRequest);

    return (
      <div className="d-flex align-items-baseline">
        <span className="mr-auto">{resendRequestMessage}</span>
        <Button
          size="sm"
          titleText={i18n.t('cert-app.Audit.Experience.ResendRequestButton')}
          variant="outline-primary"
          onClick={this.handleSendButtonClick}
          disabled={sending}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  postAuditReference: data => dispatch(apiActions.postAuditReferenceRequest(data)),
});

export default connect(
  null,
  mapDispatchToProps // eslint-disable-line comma-dangle
)(ReferenceResendReminder);
