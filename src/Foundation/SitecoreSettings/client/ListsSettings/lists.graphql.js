import gql from 'graphql-tag';

const query = gql`
query getLists($dataFolderPath: String, $listsFolderTemplate: String) {
  data: item(path: $dataFolderPath) {
    lists: children(includeTemplateIDs: [$listsFolderTemplate]) {
      data: children {
        name
        items: children {
          name
          displayName
          ...on AcademicEducationLevel {
            fieldOfStudyAvailable {
              boolValue
            }
            degreeProgramAvailable {
              boolValue
            }
          }
          ... on AgileMethodology {
            apiKey {
              value
            }
          }
          ... on FunctionalAreaType {
            apiKey {
              value
            }
          }
          ... on Methodology {
            apiKey {
              value
            }
          }
          ... on PrimaryFocusType {
            apiKey {
              value
            }
          }
          ... on TeamSize {
            apiKey {
              value
            }
          }
          ... on BudgetRange {
            apiKey {
              value
            }
          }
        }
      }
    }
  }
}
`;

export default query;
