import gql from 'graphql-tag';

const query = gql`
query (
  $settingsFolderPath: String,
  $settingsFoldersTemplateIDs: [String],
  $settingsItemsTemplateIDs: [String]
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
          ...on TextField {
            value
          }
          ...on NumberField {
            value
          }
          ...on LinkField {
            url
          }
          ...on CheckboxField {
            value
            boolValue
          }
        }
        ...on CertificationType {
          apiKey {
            value
          }
        }
      }
    }
  }
}
`;

export default query;
