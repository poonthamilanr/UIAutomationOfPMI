import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import GraphQLData from 'foundation/Infrastructure/client/api/GraphQL/GraphQLData';
import { setRequirementsSettings } from '../actions';
import settingsQuery from './query.graphql';

const RequirementsSettings = Component => props => {
  const { setRequirementsSettings, sitecoreContext } = props;
  const settingsFolderPath = `${sitecoreContext.appRedirects.rootPath}/Settings`

  const configuration = {
    options: {
      variables: {
        requirementTypesFolderTemplate: "0B2FB212-CDB2-4684-B421-7D2A03DC190D",
        requirementTemplate: "4264A1B4-81A2-4473-B5CA-EA2474053CC8",
        worktypesFolderTemplate: "87F8EA1B-390C-41E2-AE34-4106BE5482B1",
        worktypeTemplate: "D534F2EB-12E9-4360-BE19-89B44E7B7B0A",
        settingsFolderPath,
      },
    },
    name: 'requirementsSettingsContext',
    props: props => {
      const settings = props.requirementsSettingsContext.settings;

      if (settings) {
        const sitecoreSettings = {
          requirements: settings.requirements[0].items,
          worktypes: settings.worktypes[0].items,
        };

        setRequirementsSettings(sitecoreSettings);
      }

      return {};
    },
  }

  const WithSettingsComponent = GraphQLData(settingsQuery, configuration)(Component);

  return (
    <WithSettingsComponent {...props} />
  )
}

const mapDispatchToProps = dispatch => ({
  setRequirementsSettings: (data) => dispatch(setRequirementsSettings(data)),
});

const RequirementsSettingsComposed = compose(connect(null, mapDispatchToProps), RequirementsSettings);

export default RequirementsSettingsComposed;