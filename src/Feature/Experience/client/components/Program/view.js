import React from 'react';
import { connect } from 'react-redux';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { getProgramValidationSchema, appendEndDate } from "foundation/Application/client/Experience/validationSchemas";
import * as uiActions from './actions';
import { getDisplayOption } from '../ExperienceView/displayOption';
import ExperienceView from '../ExperienceView';
import Property from '../ExperienceView/property';
import DateProperty from '../ExperienceView/dateProperty';

class ProgramExperienceView extends React.PureComponent {
  render() {
    const { experience, fields, openEditForm, sitecoreListsSettings } = this.props;
    const lists = sitecoreListsSettings || {};
    const validationSchema = getProgramValidationSchema(fields);
    const requirementsMet = validationSchema.isValidSync(appendEndDate(experience));

    return (
      <ExperienceView
        experience={experience}
        fields={fields}
        labelDescription={<Text field={fields.ViewModeSummary} />}
        openEditForm={openEditForm}
        requirementsMet={requirementsMet}
        noCollapse
      >
        <div className="row">
          <div className="col-md-4">
            <Property
              label={<Text field={fields.ViewModeOrganization} />}
              value={experience.company}
            />
          </div>
          <div className="col-md-4">
            <Property
              label={<Text field={fields.ViewModeJobTitle} />}
              value={experience.jobTitle}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Property
              label={<Text field={fields.ViewModeFunctionalReportingArea} />}
              value={getDisplayOption(
                lists.FunctionalAreaTypes,
                experience.functionalAreaTypeEnum,
                experience.functionalAreaTypeOther,
              )}
            />
          </div>
          <div className="col-md-4">
            <Property
              label={<Text field={fields.ViewModeOrganizationPrimaryFocus} />}
              value={getDisplayOption(
                lists.PrimaryFocusTypes,
                experience.primaryFocusTypeEnum,
                experience.primaryFocusTypeOther,
              )}
            />
          </div>
          <div className="col-md-4">
            <Property
              label={<Text field={fields.ViewModeBudget} />}
              value={getDisplayOption(lists.BudgetRanges, experience.budgetRangeEnum)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Property
              label={<Text field={fields.ViewModeNumberOfDirectReports} />}
              value={experience.directReports}
            />
          </div>
          <div className="col-md-4">
            <Property
              label={<Text field={fields.ViewModeDirectPMReports} />}
              value={experience.pmReports}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md">
            <DateProperty
              endDate={experience.endDate}
              label={<Text field={fields.ViewModeSpentTime} />}
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

export default connect(null, mapDispatchToProps)(ProgramExperienceView);
