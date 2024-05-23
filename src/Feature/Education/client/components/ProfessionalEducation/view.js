import React from 'react';
import { connect } from 'react-redux';
import { LinkButton } from '@pmi/dsm-react-bs4';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import i18n from 'i18next';
import IconPencil from '@pmi/dsm-react-bs4/dist/components/icons/16/PencilIcon';
import IconBin from '@pmi/dsm-react-bs4/dist/components/icons/16/BinIcon';
import * as apiActions from 'foundation/Application/client/ProfessionalEducation/actions';
import * as uiActions from "./actions";

const Property = ({ label, value }) => {
  return (
    <div className="professional-education-property">
      <label className="professional-education-property__label">{label}</label>
      <div className="professional-education-property__value">{value}</div>
    </div>
  );
};

class ProfesionalEducationView extends React.Component {
  handleRemoveClick = () => {
    const { education, removeEducation } = this.props;
    removeEducation(education._links.self.href);
  }

  handleEditClick = () => {
    const { education, openEditForm } = this.props;
    openEditForm(education._links.self.href);
  }

  getDisplatDate(value) {
    const { sitecoreListsSettings } = this.props;
    const date = new Date(value);
    const month = value ? sitecoreListsSettings.Months[date.getMonth()].displayName : '';
    const year = date.getFullYear();
    return `${month} ${year}`;
  }

  getDisplayDatePeriod(dateFrom, dateTo) {
    if (!dateFrom || !dateTo) {
      return null;
    }

    return `${this.getDisplatDate(dateFrom)} - ${this.getDisplatDate(dateTo)}`;
  }

  render() {
    const { education, sitecoreSettings, sitecoreListsSettings, hideChangeOption, fields } = this.props;

    if (!sitecoreSettings || !sitecoreListsSettings) {
      return null;
    }

    return (
      <div className="professional-education professional-education_view">
        <div className="professional-education-container professional-education__header">
          {education.courseTitle}
        </div>
        <div className="professional-education-container professional-education__body">
          <div className="row">
            <div className="col">
              <Property
                value={education.institution}
                label={<Text field={fields.ViewModeProviderName} />}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <Property
                value={this.getDisplayDatePeriod(education.courseStartDate, education.courseEndDate)}
                label={<Text field={fields.ViewModeCourseDates} />}
              />
            </div>
            <div className="col-md-7">
              <Property
                value={education.hoursTotal}
                label={<Text field={fields.ViewModeHours} />}
              />
            </div>
          </div>
        </div>
        {!hideChangeOption && (
          <div className="professional-education__buttons">
            <LinkButton
              className="with-icon link-base"
              onClick={this.handleRemoveClick}
              icon={IconBin}
              titleText={i18n.t('cert-app.Education.ProfessionalEducation.RemoveEducation')}
            />
            <LinkButton
              className="with-icon link-base"
              onClick={this.handleEditClick}
              icon={IconPencil}
              titleText={i18n.t('cert-app.Education.ProfessionalEducation.EditEducation')}
            />
          </div>)}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  openEditForm: ref => dispatch(uiActions.setOpenRef(ref)),
  removeEducation: (data) => dispatch(apiActions.deleteProfessionalEducation(data)),
});

export default connect(null, mapDispatchToProps)(ProfesionalEducationView);
