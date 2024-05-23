import React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-react';
import { RadioGroup } from 'foundation/FormFields/client/components';
import * as apiActions from 'foundation/Application/client/ExamLocation/actions';
import { getExamLocationStatus } from 'foundation/Application/client/ExamLocation/accessors';
import { getLocationStatus } from 'feature/ExamDetails/client/components/ExamDetails/accessors';
import { ApiStatus } from 'foundation/CertificationApiCore/client/constants';
import 'feature/ExamDetails/client/components/ExamLocation/examLocation.scss';

class ExamAccommodation extends React.Component {
  handleAccommodationChange = newValue => {
    this.props.saveExamAccommodation(newValue);
  };

  renderForm = () => {
    const { fields } = this.props; // error

    const answerOptions = [
      { value: false, label: fields.EditModeExamAccommodationsRadioLabelNo?.value },
      { value: true, label: fields.EditModeExamAccommodationsRadioLabelYes?.value },
    ];

    return (
      <Form>
        <div className="exam-location">
          <h2 className="exam-location__title">
            <Text field={fields.EditModeExamAccommodationsTitle} />
          </h2>
          <Row>
            <Col xs={12} md={6}>
              <RichText field={fields.ExamAccommodationsDescription} />
            </Col>
            <Col xs={12} md={6}>
              <div className="exam-location__accommodation-radio">
                <RadioGroup
                  fieldName="accommodationRequested"
                  required
                  onChange={this.handleAccommodationChange}
                  options={answerOptions}
                  disabled={this.props.saving}
                />
              </div>
              <div className="exam-location__accommodation-disclaimer">
                <Text field={fields.ExamAccommodationsDisclaimer} />
              </div>
            </Col>
          </Row>
        </div>
      </Form>
    );
  };

  renderFormik = () => {
    const initialValues = {
      accommodationRequested: false,
    };

    return (
      <Formik
        initialValues={initialValues}
        render={this.renderForm}
        enableReinitialize
      />
    );
  };

  render() {
    const { fields, isValidExamLocation } = this.props;

    if (!fields) {
      return <div className="static-height" />;
    }
    const cssClass = isValidExamLocation ? "edit-mode" : "edit-mode disable-view";
    return (
      <div className={cssClass}>
        {this.renderFormik()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  saving: getExamLocationStatus(state) === ApiStatus.Submitting,
  isValidExamLocation: getLocationStatus(state),
});

const mapDispatchToProps = dispatch => ({
  saveExamAccommodation: data => dispatch(apiActions.saveExamAccommodation(data)),
});

const examAccommodation = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExamAccommodation);

export default examAccommodation;
