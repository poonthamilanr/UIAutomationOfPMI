import React from 'react';
import { connect } from 'react-redux';
import { Button, LinkButton } from '@pmi/dsm-react-bs4';
import IconPencil from '@pmi/dsm-react-bs4/dist/components/icons/16/PencilIcon';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { getLocationStatus } from 'feature/ExamDetails/client/components/ExamDetails/accessors';
import i18n from 'i18next';
import * as pageActions from "../ExamDetails/actions";

class NameOnCertificateView extends React.PureComponent {
  render() {
    const { nameOnCertificate, openForm, fields, isValidExamLocation } = this.props;
    const cssClass = isValidExamLocation ? "view-mode" : "view-mode disable-view";
    return (
      <div className={cssClass}>
        <div className="view-mode__exam">
          <h2><Text field={fields.ViewModeNameOnCertificateTitle} /></h2>
          {nameOnCertificate &&
            <p>{nameOnCertificate}</p>}
        </div>
        {nameOnCertificate && (
          <>
            <LinkButton
              className="btn with-icon link-base d-none d-md-flex"
              onClick={openForm}
              icon={IconPencil}
              titleText={i18n.t('cert-app.ExamDetails.NameOnCertificate.EditName')}
            />
            <Button
              variant="outline-primary"
              className="d-md-none mt-2"
              onClick={openForm}
              titleText={i18n.t('cert-app.ExamDetails.NameOnCertificate.EditName')}
            />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isValidExamLocation: getLocationStatus(state),
});

const mapDispatchToProps = dispatch => ({
  openForm: () => dispatch(pageActions.openForm('nameOnCertificate')),
});

export default connect(mapStateToProps, mapDispatchToProps)(NameOnCertificateView);
