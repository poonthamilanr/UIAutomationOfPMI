import gql from 'graphql-tag';

const query = gql`
query (
  $settingsFolderPath: String,
  $settingsFoldersTemplateIDs: [String!],
  $settingsItemsTemplateIDs: [String!],
  $navigationMenuItemTemplateID: String!
) {
  settings: item(path: $settingsFolderPath) {
    children(includeTemplateIDs: $settingsFoldersTemplateIDs) {
      name
      template {
        id
      }
      children(includeTemplateIDs: $settingsItemsTemplateIDs) {
        name
        displayName
        fields(ownFields: true) {
          name
          ...pureField
        }
        ...on NavigationMenu {
        	children(includeTemplateIDs: [$navigationMenuItemTemplateID]) {
            name
            displayName
            fields(ownFields: true) {
              name
              ...pureField
            }
            children(includeTemplateIDs: [$navigationMenuItemTemplateID]) {
              name
              displayName
              fields(ownFields: true) {
                name
                ...pureField
              }
            }
          }
        }
      }
    }
  }
}

fragment pureField on ItemField {
  ...on TextField {
    value
  }
  ...on NumberField {
    value
  }
  ...on CheckboxField {
    value
    boolValue
  }
  ...on LinkField {
    url
    jss
  }
}
`;

export default query;
