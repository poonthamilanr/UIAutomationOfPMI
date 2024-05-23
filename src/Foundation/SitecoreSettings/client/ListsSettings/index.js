import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import GraphQLData from 'foundation/Infrastructure/client/api/GraphQL/GraphQLData';
import { setListsSettings } from '../actions';
import listsQuery from './lists.graphql';

const ListsSettings = Component => props => {
  const { setListsSettings, sitecoreContext } = props;
  const dataFolderPath = `${sitecoreContext.appRedirects.rootPath}/Data`

  const configuration = {
    options: {
      variables: {
        dataFolderPath,
        listsFolderTemplate: 'F1215BFA-2427-4647-B8BD-5B67ADCBCA1B',
      },
    },
    name: 'listSettingsContext',
    props(props) {
      const data = props.listSettingsContext.data;

      if (data) {
        const sitecoreListsSettings = data.lists[0].data.reduce((result, list) => ({ ...result, [list.name]: list.items }), {});
        setListsSettings(sitecoreListsSettings);
      }

      return {};
    },
  }

  const WithSettingsComponent = GraphQLData(listsQuery, configuration)(Component);

  return (
    <WithSettingsComponent {...props} />
  )
}

const mapDispatchToProps = dispatch => ({
  setListsSettings: (data) => dispatch(setListsSettings(data)),
});

const ListsSettingsComposed = compose(connect(null, mapDispatchToProps), ListsSettings);

export default ListsSettingsComposed;