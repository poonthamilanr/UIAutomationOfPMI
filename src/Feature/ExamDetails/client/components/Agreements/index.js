import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { CheckboxField } from 'foundation/FormFields/client/components';
import { getLocationStatus } from 'feature/ExamDetails/client/components/ExamDetails/accessors';
import TermsAndAgreementsModal from "./termsAndAgreementsModal";
import * as uiActions from "./actions";

class Agreements extends React.Component {
  state = {
    isOpen: false,
  };

  handleShow = () => {
    this.setState({ isOpen: true });
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  onChange = (values) => {
    const { termsAndAgreements, accurateAndComplete } = values;
    if (termsAndAgreements && accurateAndComplete) {
      this.props.setValidity(true);
    } else {
      this.props.setValidity(false);
    }
  };

  renderForm = () => {
    const { isOpen } = this.state;
    const { fields, isValidExamLocation } = this.props;
    const richText = fields && { ...fields.Text };
    const cssClass = isValidExamLocation ? "" : "disable-view";
    return (
      <Form className={cssClass}>
        <CheckboxField
          classNameGroup="mb-2"
          fieldName="termsAndAgreements"
          index="termsAndAgreements"
          required
          label={<Text field={fields.EditModeIAgree} />}
          linkText={fields.EditModeTermsAndAgreements && fields.EditModeTermsAndAgreements.value}
          onClickLink={this.handleShow}
          onChange={this.onChange}
        />
        <CheckboxField
          fieldName="accurateAndComplete"
          index="accurateAndComplete"
          label={<Text field={fields.EditModeInformationIsAccurateAndComplete} />}
          onChange={this.onChange}
          required
        />
        <TermsAndAgreementsModal
          show={isOpen}
          onHide={this.handleClose}
          text={richText}
          title={fields.EditModePmiCertAppRenewalAgreement}
        />
      </Form>
    );
  };

  render() {
    const initialValues = { termsAndAgreements: false, accurateAndComplete: false };
    const { fields } = this.props;

    if (!fields) {
      return <div className="static-height"/>;
    }

    return (
      <Formik
        initialValues={initialValues}
        render={this.renderForm}
      />
    )
  }
};

const mapStateToProps = state => ({
  isValidExamLocation: getLocationStatus(state),
});


const mapDispatchToProps = dispatch => ({
  setValidity: (isValid) => dispatch(uiActions.setValidity(isValid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Agreements);