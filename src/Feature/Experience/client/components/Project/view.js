import React from 'react';
import { connect } from 'react-redux';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { getWorkflowType } from 'foundation/Application/client/certtype-storage';
import { getProjectValidationSchema, appendEndDate } from "foundation/Application/client/Experience/validationSchemas";
import * as uiActions from './actions';
import { getDisplayOption } from '../ExperienceView/displayOption';
import ExperienceView from '../ExperienceView';
import Property from '../ExperienceView/property';
import DateProperty from '../ExperienceView/dateProperty';

class ProjectExperienceView extends React.PureComponent {
  render() {
    const { experience, fields, openEditForm } = this.props;
    const lists = this.props.sitecoreListsSettings || {};
    const workflowType = getWorkflowType();
    const validationSchema = getProjectValidationSchema(fields, workflowType);
    const requirementsMet = validationSchema.isValidSync(appendEndDate(experience));

    return (
      <ExperienceView
        experience={experience}
        fields={fields}
        labelDescription={<Text field={fields.ViewModeSummary}/>}
        openEditForm={openEditForm}
        hideDescription={workflowType === 'PfMP'}
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
        {(workflowType !== 'CPBEP') && (
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
        )}
        {(workflowType !== 'PMI_SP' && workflowType !== 'PMI_RMP' && workflowType !== 'PfMP' && workflowType !== 'CPBEP') &&
          <div className="row">
            <div className="col-md">
              <Property
                label={<Text field={fields.ViewModeApproach}/>}
                value={getDisplayOption(lists.Methodologies, experience.methodologyEnum)}
              />
            </div>
            <div className="col-md">
              <Property
                label={<Text field={fields.ViewModeTeamSize}/>}
                value={getDisplayOption(lists.TeamSizes, experience.teamSizeEnum)}
              />
            </div>
          </div>}
        <div className="row">
          {(workflowType !== 'PMI_SP' && workflowType !== 'PMI_RMP' && workflowType !== 'PfMP' && workflowType !== 'CPBEP') &&
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

export default connect(null, mapDispatchToProps)(ProjectExperienceView);
