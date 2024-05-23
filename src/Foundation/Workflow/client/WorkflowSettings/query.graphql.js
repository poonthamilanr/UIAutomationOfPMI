import gql from 'graphql-tag';

const query = gql`
query (
  $settingsFolderPath: String,
  $workflowTypeFolderTemplate: String,
  $workflowTypeTemplate: String
) {
  settings: item(path: $settingsFolderPath) {
    workflowTypes: children(includeTemplateIDs: [$workflowTypeFolderTemplate]) {
      items: children(includeTemplateIDs: [$workflowTypeTemplate]) {
        apiKey: field(name: "ApiKey") {
          value
        }
        steps: field(name: "Steps") {
          ... on MultilistField {
            targetItems {
              id(format: "D")
              name
              displayName
              isStartPage: field(name: "IsStartPage") {
                value
              }
              workflowStepName: field(name: "WorkflowStepName") {
                value
              }
              requirementType: field(name: "RequirementType") {
                ... on LookupField {
                  targetId(format: "D")
                }
              }
              worktypeRequirements: field(name: "WorktypeRequirements") {
                ... on MultilistField {
                  targetIds
                }
              }
              showInBreadcrumbs: field(name: "ShowInBreadcrumbs") {
                value
              }
              path
              url(options: {alwaysIncludeServerUrl: false})
            }
          }
        }
      }
    }
  }
}
`;

export default query;
