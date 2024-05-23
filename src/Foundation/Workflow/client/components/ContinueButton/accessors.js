import { UiStatus } from "foundation/FormFields/client/constants";

export const getPageStatus = (state, pageName) => state.pages[pageName]
  ? Object.entries(state.pages[pageName]).every(item => item[1].status === UiStatus.Valid)
  : UiStatus.Editing;