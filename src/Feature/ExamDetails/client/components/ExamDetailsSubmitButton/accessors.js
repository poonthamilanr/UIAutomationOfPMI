export const getPageStatus = (state, pageName) => state.pages[pageName] && Object.values(state.pages[pageName].forms).every(item => item.isValid && !item.isOpen);

export const getSubmitAppInitiatedFlag = (state) => state.pages.examDetails.submitAppInitiated;

