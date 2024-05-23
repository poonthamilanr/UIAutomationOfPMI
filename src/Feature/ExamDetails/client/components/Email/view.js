import React from 'react';
import { connect } from 'react-redux';
import { Button, LinkButton } from '@pmi/dsm-react-bs4';
import IconPencil from '@pmi/dsm-react-bs4/dist/components/icons/16/PencilIcon';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import i18n from 'i18next';
import { getLocationStatus } from 'feature/ExamDetails/client/components/ExamDetails/accessors';
import * as pageActions from "../ExamDetails/actions";

export class EmailViewBase extends React.PureComponent {
  render() {
    const { email, openForm, fields, isValidExamLocation  } = this.props;
    const cssClass = isValidExamLocation ? "view-mode" : "view-mode disable-view";
    return (
      <div className={cssClass}>
        <div className="view-mode__exam">
          <h2><Text field={fields.ViewModeTitle} /></h2>
          {email && <p>{email}</p>}
        </div>
        {email && (
          <>
            <LinkButton
              variant="link"
              className="with-icon link-base d-none d-md-flex"
              onClick={openForm}
              icon={IconPencil}
              titleText={i18n.t('cert-app.ExamDetails.Email.EditEmailLabel')}
            />
            <Button
              variant="outline-primary"
              className="d-md-none mt-2"
              onClick={openForm}
              titleText={i18n.t('cert-app.ExamDetails.Email.EditEmailLabel')}
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
  openForm: () => dispatch(pageActions.openForm('email')),
});

const emailView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailViewBase);

export default emailView;
