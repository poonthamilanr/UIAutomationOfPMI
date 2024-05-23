import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import GraphQLData from 'foundation/Infrastructure/client/api/GraphQL/GraphQLData';
import { setNavigationsSettings, setFooterSettings } from '../actions';
import { collectFolderItems, mapItemFields } from '../utils';
import listsQuery from './lists.graphql';

const NAVIGATION_FOLDER_TEMPLATE = "05820EE9-B7B4-440A-B5B3-8A6808991A84";
const NAVIGATION_MENU_TEMPLATE = "BEC8937A-FF6C-450D-BA0E-B4328C640EFB";
const NAVIGATION_MENU_ITEM_TEMPLATE = "0AF708EB-5AF0-49B4-8AC7-EFB515C114F2";

const purposeIs = value => item => (
  item.purpose.value === value
);

const collectNavigationItems = (result, item) => {
  const { children, ...resultItem } = mapItemFields(item);

  return {
    ...result,
    [item.name]: {
      ...resultItem,
      menuItems: children.map(mapItemFields),
    },
  };
};

const NavigationsSettings = Component => props => {
  const { setNavigationsSettings, setFooterSettings, sitecoreContext } = props;
  const settingsFolderPath = `${sitecoreContext.appRedirects.rootPath}/Settings`;

  const configuration = {
    options: {
      variables: {
        settingsFolderPath,
        settingsFoldersTemplateIDs: [NAVIGATION_FOLDER_TEMPLATE],
        settingsItemsTemplateIDs: [NAVIGATION_MENU_TEMPLATE],
        navigationMenuItemTemplateID: NAVIGATION_MENU_ITEM_TEMPLATE,
      },
    },
    name: 'navigationsSettingsContext',
    props(props) {
      const { settings } = props.navigationsSettingsContext;

      if (!settings) {
        return;
      }

      const menus = settings.children
        .reduce(collectFolderItems(NAVIGATION_FOLDER_TEMPLATE), [])
        .map(mapItemFields);

      const headerNavigation = menus.filter(purposeIs('header'))[0];
      const footerNavigation = menus.filter(purposeIs('footer'))[0];

      if (headerNavigation) {
        const data = headerNavigation.children.reduce(collectNavigationItems, {});
        setNavigationsSettings(data);
      }

      if (footerNavigation) {
        const data = footerNavigation.children.reduce(collectNavigationItems, {});
        setFooterSettings(data);
      }
    },
  }

  const WithSettingsComponent = GraphQLData(listsQuery, configuration)(Component);

  return (
    <WithSettingsComponent {...props} />
  )
}

const mapDispatchToProps = dispatch => ({
  setNavigationsSettings: (data) => dispatch(setNavigationsSettings(data)),
  setFooterSettings: (data) => dispatch(setFooterSettings(data)),
});

const NavigationsSettingsComposed = compose(
  connect(null, mapDispatchToProps),
  NavigationsSettings);

export default NavigationsSettingsComposed;