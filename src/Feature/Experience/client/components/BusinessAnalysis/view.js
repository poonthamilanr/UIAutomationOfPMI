import React from 'react';
import { connect } from 'react-redux';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { getBusinessAnalysisValidationSchema, appendEndDate } from "foundation/Application/client/Experience/validationSchemas";
import * as uiActions from './actions';
import ExperienceView from '../ExperienceView';
import { getDisplayOption } from '../ExperienceView/displayOption';
import Property from '../ExperienceView/property';
import DateProperty from '../ExperienceView/dateProperty';

class BusinessAnalysisExperienceView extends React.PureComponent {
  render() {
    const { experience, fields, openEditForm } = this.props;
    const lists = this.props.sitecoreListsSettings || {};
    const validationSchema = getBusinessAnalysisValidationSchema(fields);
    const requirementsMet = validationSchema.isValidSync(appendEndDate(experience));

    return (
      <ExperienceView
        experience={experience}
        fields={fields}
        labelDescription={<Text field={fields.ViewModeSummary}/>}
        openEditForm={openEditForm}
        requirementsMet={requirementsMet}
      >
        <div className="row">
          <div className="col-md">
            <Property
              label={<Text field={fields.ViewModeOrganization}/>}
              value={experience.company}
            />
          </div>
          <div className="col-md">
            <Property
              label={<Text field={fields.ViewModeJobTitle}/>}
              value={experience.jobTitle}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md">
            <Property
              label={<Text field={fields.ViewModeFunctionalReportingArea}/>}
              value={getDisplayOption(
                lists.FunctionalAreaTypes,
                experience.functionalAreaTypeEnum,
                experience.functionalAreaTypeOther,
              )}
            />
          </div>
          <div className="col-md">
            <Property
              label={<Text field={fields.ViewModeOrganizationPrimaryFocus}/>}
              value={getDisplayOption(
                lists.PrimaryFocusTypes,
                experience.primaryFocusTypeEnum,
                experience.primaryFocusTypeOther,
              )}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md">
            <Property
              label={<Text field={fields.ViewModeApproach}/>}
              value={getDisplayOption(lists.Methodologies, experience.methodologyEnum)}
            />
          </div>
          <div className="col-md">
            <DateProperty
              endDate={experience.endDate}
              label={<Text field={fields.ViewModeSpentTime}/>}
              sitecoreList={lists}
              startDate={experience.startDate}
            />
          </div>
        </div>
      </ExperienceView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  openEditForm: ref => dispatch(uiActions.setOpenRef(ref)),
});

export default connect(null, mapDispatchToProps)(BusinessAnalysisExperienceView);
