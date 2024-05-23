import { combineReducers } from "redux";
// UI Reducers
import examDetailsReducer from "feature/ExamDetails/client/components/ExamDetails/reducers";
import educationReducer from "feature/Education/client/components/Education/reducers";
import experienceReducer from "feature/Experience/client/components/Experience/reducers";
import experienceSummariesReducers from "feature/ExperienceSummaries/client/components/ExperienceSummaries/reducers";
import { pageLoaderReducer } from "foundation/FormFields/client/components/PageLoader/reducers";
import adobeAnalyticsReducer from "foundation/Analytics/client/AdobeAnalytics/reducers";
// API Reducers
import { profileInfoReducers, profileMetadataReducers } from "foundation/Profile/client/reducers";
import { applicationInfoReducers } from "foundation/Application/client/reducers";
import { applicationRequirementsReducer } from "foundation/AppRequirements/client/reducers";
import appStartReducer from "foundation/AppStart/client/reducers";
import sitecoreSettingsReducer from "foundation/SitecoreSettings/client/reducers";
import workflowStepsReducer from "foundation/Workflow/client/WorkflowSettings/reducers";
import { navigationReducers } from "foundation/Navigation/client/reducers";
import { configInfoReducers } from "foundation/Config/client/reducers";

const apiInfoReducers = {
  ...profileInfoReducers,
  ...applicationInfoReducers,
  ...configInfoReducers,
  appRequirements: applicationRequirementsReducer,
  appStart: appStartReducer,
  sitecoreSettings: sitecoreSettingsReducer,
  workflowSteps: workflowStepsReducer,
  ...navigationReducers,
};
const apiMetadaReducers = {
  ...profileMetadataReducers,
  // application: applicationInfoReducers,
}
const uiReducers = {
  pages: combineReducers({
    examDetails: examDetailsReducer,
    education: educationReducer,
    experience: experienceReducer,
    experienceSummaries: experienceSummariesReducers,
    loading: pageLoaderReducer,
  }),
  adobeAnalytics: adobeAnalyticsReducer,
};

const rootReducer = combineReducers({
  ...apiInfoReducers,
  ...apiMetadaReducers,
  ...uiReducers,
});

export default rootReducer;
