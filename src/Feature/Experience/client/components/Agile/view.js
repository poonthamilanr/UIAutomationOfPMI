import React from 'react';
import { connect } from 'react-redux';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { getAgileValidationSchema, appendEndDate } from "foundation/Application/client/Experience/validationSchemas";
import * as uiActions from './actions';
import ExperienceView from '../ExperienceView';
import { getDisplayOption } from '../ExperienceView/displayOption';
import Property from '../ExperienceView/property';
import DateProperty from '../ExperienceView/dateProperty';

class AgileExperienceView extends React.PureComponent {
  render() {
    const { experience, fields, openEditForm } = this.props;
    const lists = this.props.sitecoreListsSettings || {};
    const nameByList = options => value => getDisplayOption(options, value);
    const hasValue = value => Boolean(value);
    const trimValue = value => value.trim();
    const validationSchema = getAgileValidationSchema(fields);
    const requirementsMet = validationSchema.isValidSync(appendEndDate(experience));

    const agileMethodologiesList = [
      ...(experience.agileMethodologyEnum || '').split(',').map(trimValue).map(nameByList(lists.AgileMethodologies)),
      ...(experience.agileMethodologyOther || '').split(',').map(trimValue),
    ].filter(hasValue).join(', ');

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
              value={agileMethodologiesList}
            />
          </div>
          <div className="col-md">
            <Property
              label={<Text field={fields.ViewModeTeamSize}/>}
              value={getDisplayOption(lists.TeamSizes, experience.teamSizeEnum)}
            />
          </div>
        </div>
        <div className="row">
          {experience.budgetRangeEnum &&
            <div className="col-md">
              <Property
                label={<Text field={fields.ViewModeBudget}/>}
                value={getDisplayOption(lists.BudgetRanges, experience.budgetRangeEnum)}
              />
            </div>}
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

export default connect(null, mapDispatchToProps)(AgileExperienceView);
