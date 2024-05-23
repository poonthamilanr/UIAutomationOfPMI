import gql from 'graphql-tag';

const query = gql`
query (
  $settingsFolderPath: String,
  $requirementTypesFolderTemplate: String,
  $requirementTemplate: String,
  $worktypesFolderTemplate: String,
  $worktypeTemplate: String,
) {
  settings: item(path: $settingsFolderPath) {
    requirements: children(includeTemplateIDs: [$requirementTypesFolderTemplate]) {
      items: children(includeTemplateIDs: [$requirementTemplate]) {
        id(format: "D")
        apiKey: field(name: "ApiKey") {
          value
        }
      }
    }
    worktypes: children(includeTemplateIDs: [$worktypesFolderTemplate]) {
      items: children(includeTemplateIDs: [$worktypeTemplate]) {
        id(format: "D")
        apiKey: field(name: "ApiKey") {
          value
        }
      }
    }
  }
}
`;

export default query;
