import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import i18n from 'i18next';
import { Button } from '@pmi/dsm-react-bs4';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { InputField, MonthsPeriod, SaveButton, SelectAutoCompleteField } from 'foundation/FormFields/client/components';
import { getIsSavingStatus } from 'foundation/Application/client/ProfessionalEducation/accessors';
import { getProviders } from 'foundation/Profile/client/Metadata/providers/accessors';
import * as metaProviderApiActions from 'foundation/Profile/client/Metadata/providers/actions';
import { getCourses } from 'foundation/Profile/client/Metadata/courses/accessors';
import * as metaCoursesApiActions from 'foundation/Profile/client/Metadata/courses/actions';
import * as apiActions from 'foundation/Application/client/ProfessionalEducation/actions';
import FormTracking from 'foundation/Analytics/client/components/AdobeAnalytics/formTracking';
import * as uiActions from "./actions";


class ProfEducationEdit extends React.Component {
  state = {
    isFormStart: false,
    providerId: 0,
  };

  validationSchema = () => {
    const { fields } = this.props;

    return Yup.object().shape({
      courseTitle: Yup.string()
        .required(fields.CourseTitleIsRequired.value)
        .max(1024),
      institution: Yup.string()
        .required(fields.ProviderNameIsRequired.value)
        .max(1024),
      hoursTotal: Yup.number()
        .required(fields.QualifyingHoursIsRequired.value)
        .positive(fields.QualifyingHoursPositiveNumber.value),
      courseStartDate: Yup.string()
        .required(fields.CourseStartDateIsRequired.value),
      courseEndDate: Yup.string()
        .required(fields.CourseEndDateIsRequired.value)
        .test('is-bigger', fields.EndDateMustBeLaterThanTheStartDate.value, function (courseEndDate) {
          const { courseStartDate } = this.parent;
          return courseStartDate && courseEndDate ? new Date(courseStartDate) <= new Date(courseEndDate) : true;
        }),
    })
  };

  handleFocus = () => {
    this.setState({
      isFormStart: true,
    });
  }

  handleCancelClick = () => {
    this.props.openEditForm(null);
  }

  handleSaveClick = (formikProps) => (e) => {
    e.preventDefault();
    formikProps.submitForm();
  };

  handleSubmit = (values) => {
    const { saveEducation } = this.props;
    const education = {
      ...values,
      hoursTotal: +values.hoursTotal || undefined,
    };
    saveEducation(education);
  }

  loadCourse = (value) => {
    const { providersData, fetchCourses, fetchProviders } = this.props;
    const maxCount = 1000;
    if(value.length > 0)
    {
      const providerItem = (providersData || []).filter(item => item.providername === value);
      if(providerItem && providerItem.length !== 0)
      {
        this.setState({
          providerId: providerItem[0].id,
        });
        fetchCourses({providerId:providerItem[0].id,courseName:'',start:0,rows:maxCount});
      }
      else
      {
        fetchProviders({term:value,start:0,rows:maxCount});
      }
    }
  }

  updateCourse = (value) => {
    const { fetchCourses, coursesData } = this.props;
    const maxCount = 1000;
    const courseItem = (coursesData || []).filter(item => item.coursename === value);
    if(courseItem === null ||  courseItem === undefined || courseItem.length === 0)
    {
      fetchCourses({providerId:this.state.providerId,courseName:value,start:0,rows:maxCount});
    }
  }

  renderForm = formikProps => {
    const { education, saving, isShowCancelButton, sitecoreListsSettings, fields, providersData, coursesData } = this.props;

    const extractProviderName = provider => provider.providername;
    const providers = (providersData || []).map(extractProviderName);
    const extractCoursesName = courses => courses.coursename;
    const courses = (coursesData || []).map(extractCoursesName);
    return (
      <Form className="edit-mode professional-education" onFocus={this.handleFocus}>
        <FormTracking
          formik={formikProps}
          formName="professional education"
          formStartState={this.state.isFormStart}
        />
        <div className="form-row">
          <div className='col-lg-12'>
            <SelectAutoCompleteField
              options={providers}
              onChange={this.loadCourse}
              fieldName='institution'
              maxLength={1024}
              disabled={saving}
              label={<Text field={fields.EditModeProviderName} />}
              required
            />
            <SelectAutoCompleteField
              options={courses}
              onChange={this.updateCourse}
              fieldName='courseTitle'
              maxLength={1024}
              disabled={saving}
              label={<Text field={fields.EditModeCourseTitle} />}
              required
            />
          </div>
          <div className='col-lg-9'>
            <MonthsPeriod
              startDateField="courseStartDate"
              endDateField="courseEndDate"
              monthList={sitecoreListsSettings.Months.map(item => item.displayName)}
              minDate={new Date(new Date().getFullYear() - 100, new Date().getMonth())}
              maxDate={new Date()}
              yearsSort="desc"
              disabled={saving}
              label={<Text field={fields.EditModeCourseDates} />}
              required
            />
          </div>
          <div className='col-lg-3'>
            <InputField
              fieldName='hoursTotal'
              inputType="number"
              min={0}
              label={<Text field={fields.EditModeQualifyingHours} />}
              required
            />
          </div>
          <div className="d-flex align-items-end mt-4 col-lg-12">
            {(education || isShowCancelButton) &&
              <Button
                className="mr-2"
                disabled={saving}
                onClick={this.handleCancelClick}
                variant="outline-primary"
                titleText={i18n.t('cert-app.Common.Cancel')}
              />}
            <SaveButton
              className="btn"
              saving={saving}
              label={i18n.t('cert-app.Education.ProfessionalEducation.SaveEducation')}
              onClick={this.handleSaveClick(formikProps)}
            />
          </div>
        </div>
      </Form>
    )
  }

  render() {
    const { education, sitecoreSettings, sitecoreListsSettings } = this.props;
    const initialValues = { ...education };

    if (!sitecoreSettings || !sitecoreListsSettings) {
      return null;
    }

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        validateOnChange
        validationSchema={this.validationSchema()}
      >
        {this.renderForm}
      </Formik>
    )
  }
}

const mapStateToProps = state => ({
  saving: getIsSavingStatus(state),
  providersData: getProviders(state),
  coursesData: getCourses(state),
});

const mapDispatchToProps = dispatch => ({
  openEditForm: ref => dispatch(uiActions.setOpenRef(ref)),
  saveEducation: (data) => dispatch(apiActions.saveProfessionalEducation(data)),
  fetchProviders: (data) => dispatch(metaProviderApiActions.fetchProviders(data)),
  fetchCourses: (data) => dispatch(metaCoursesApiActions.fetchCourses(data)),
});

const ProfessionalEducationEdit = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfEducationEdit);

export default ProfessionalEducationEdit;
