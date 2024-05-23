import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { CountrySelect } from "foundation/FormFields/client/components";
import * as apiActions from 'foundation/Application/client/ExamLocation/actions';
import { getExamLocationStatus} from 'foundation/Application/client/ExamLocation/accessors';
import { ApiStatus } from 'foundation/CertificationApiCore/client/constants';
import { getApplicationType, getExamVendorCountry } from 'foundation/Application/client/Application/accessors';
import { getMcExamType } from "foundation/Application/client/Exam/accessors";
import { getGlobalSettings } from 'foundation/SitecoreSettings/client/accessors';
import * as uiActions from "./actions";
import './examLocation.scss';

class ExamLocation extends React.Component {
    validationSchema = Yup.object().shape({
      examLocation: Yup.string()
        .required(this.props.fields.CountryIsRequired.value),
    });

    handleExamLocationChange = () => (newValue) => {
      if(newValue.value === '' || newValue.value === undefined)
      {
        this.props.setValidity(false);
      }
      else
      {
        this.props.saveExamLocation(newValue.value);
      }
    }

    renderForm = (formikProps) => {

      const { fields, sitecoreSettings, applicationType, mcExamType  } = this.props;
      if (!sitecoreSettings) {
        return null;
      }

      if (!applicationType && !mcExamType) {
        return null;
      }

      const certificationType = applicationType || mcExamType;

      if(formikProps.values.examLocation !== undefined && formikProps.values.examLocation !== null && formikProps.values.examLocation !== '')
      {
        this.props.setValidity(true);
      }

      const applicationCertTypeItem = sitecoreSettings.certTypes
          && sitecoreSettings.certTypes.find(certType => certType.apiKey && (certType.apiKey.value === certificationType));
      const disabledCountryList = applicationCertTypeItem && applicationCertTypeItem.disabledCountries && applicationCertTypeItem.disabledCountries.value;
      return (
        <Form>
          <div className="exam-location">
            <h2 className="exam-location__title">{fields.EditModeExamLocation.value}</h2>
            <div className="row">
              <CountrySelect
                classNameGroup="col-md-12"
                fieldName="examLocation"
                excludeEmbargoed
                required
                disabled={this.props.saving}
                onChange={this.handleExamLocationChange(formikProps)}
                disableCountry={disabledCountryList}
                disableText={fields.UnAvailableCountry.value}
                defaultSelection={fields.DefaultSelectionText.value}
                label={<Text field={fields.EditModeWhereExamQuestion} />}/>
            </div>
          </div>
        </Form>
      );
    };

    renderFormik = () => {
      const initialValues = {
        examLocation: this.props.examVendorCountry,
      };

      if(initialValues.examLocation === null || initialValues.examLocation === undefined)
      {
        initialValues.examLocation = '';
      }

      return (
        <Formik
          initialValues={initialValues}
          validateOnChange
          validationSchema={this.validationSchema}
          render={this.renderForm}
          enableReinitialize
        />
      );
    }

    render() {
      const { fields } = this.props;

      if (!fields) {
        return <div className="static-height"/>;
      }

      return (
        <div className="edit-mode">
          {this.renderFormik()}
        </div>
      )
    }
}

const mapStateToProps = state => ({
  saving: getExamLocationStatus(state) === ApiStatus.Submitting,
  applicationType: getApplicationType(state),
  mcExamType: getMcExamType(state),
  sitecoreSettings: getGlobalSettings(state),
  examVendorCountry: getExamVendorCountry(state),
});

const mapDispatchToProps = dispatch => ({
  saveExamLocation: (data) => dispatch(apiActions.saveExamLocation(data)),
  setValidity: (isValid) => dispatch(uiActions.setValidity(isValid)),
});

const examLocation = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExamLocation);

export default examLocation;
