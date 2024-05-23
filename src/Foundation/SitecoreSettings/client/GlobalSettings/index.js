import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import GraphQLData from 'foundation/Infrastructure/client/api/GraphQL/GraphQLData';
import { setGlobalSettings } from '../actions';
import { mapItemFields, collectFolderItems } from '../utils';
import settingsQuery from './query.graphql';

const CERT_TYPE_FOLDER_TEMPLATE = 'A8A954F3-1DF9-44C4-9411-1D4896FE38D6';
const CERT_TYPE_TEMPLATE = '218671B4-87E8-4752-BF00-2E1562D855A5';
const GLOBAL_SETTINGS_FOLDER_TEMPLATE = '1D870D98-3FF4-4322-968D-2AE5FA663517';
const GLOBAL_SETTINGS_TEMPLATE = '493DABFB-19B2-4864-A23D-9101C7298351';
const ADOBE_ANALYTICS_FOLDER_TEMPLATE = '7B4A921A-C380-4553-9AB9-9E5BF9F29A54';
const ADOBE_ANALYTICS_TEMPLATE = '5A3BF5CB-B1EE-4B87-A6E8-5ACF5262FE8E';
const AUDIT_SETTINGS_FOLDER_TEMPLATE = '9C42557B-02B6-4A9D-8452-F0ECE2270231';
const AUDIT_SETTINGS_TEMPLATE = '701FB7D1-A721-4CE3-AD53-D5A4925A54F7';

const GlobalSettings = Component => props => {
  const { setGlobalSettings, sitecoreContext } = props;
  const settingsFolderPath = `${sitecoreContext.appRedirects.rootPath}/Settings`;

  const configuration = {
    options: {
      variables: {
        settingsFolderPath,
        settingsFoldersTemplateIDs: [
          ADOBE_ANALYTICS_FOLDER_TEMPLATE,
          CERT_TYPE_FOLDER_TEMPLATE,
          GLOBAL_SETTINGS_FOLDER_TEMPLATE,
          AUDIT_SETTINGS_FOLDER_TEMPLATE,
        ],
        settingsItemsTemplateIDs: [
          ADOBE_ANALYTICS_TEMPLATE,
          CERT_TYPE_TEMPLATE,
          GLOBAL_SETTINGS_TEMPLATE,
          AUDIT_SETTINGS_TEMPLATE,
        ],
      },
    },
    name: 'settingsContext',
    props(props) {
      const settings = props.settingsContext.settings;

      if (settings) {
        setGlobalSettings({
          certTypes: settings.children
            .reduce(collectFolderItems(CERT_TYPE_FOLDER_TEMPLATE), [])
            .map(mapItemFields),
          globalSettings: settings.children
            .reduce(collectFolderItems(GLOBAL_SETTINGS_FOLDER_TEMPLATE), [])
            .map(mapItemFields)[0],
          adobeAnalytics: settings.children
            .reduce(collectFolderItems(ADOBE_ANALYTICS_FOLDER_TEMPLATE), [])
            .map(mapItemFields)[0],
          auditSettings: settings.children
            .reduce(collectFolderItems(AUDIT_SETTINGS_FOLDER_TEMPLATE), [])
            .map(mapItemFields)[0],
        });
      }

      return {};
    },
  };

  const WithSettingsComponent = GraphQLData(settingsQuery, configuration)(Component);

  return (
    <WithSettingsComponent {...props} />
  )
}

const mapDispatchToProps = dispatch => ({
  setGlobalSettings: (data) => dispatch(setGlobalSettings(data)),
});

const GlobalSettingsComposed = compose(connect(null, mapDispatchToProps),GlobalSettings);

export default GlobalSettingsComposed;
