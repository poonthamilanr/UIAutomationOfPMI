export const getPageStatus = (state, pageName) =>
  state.pages[pageName] && Object.values(state.pages[pageName].forms).every(item => item.isValid && !item.isOpen);


export const getPageStatusByForm = (state, pageName,formName) =>
  state.pages[pageName] &&  Object.values(formName.map(selectProps(state.pages[pageName].forms))).every(item => item.isValid && !item.isOpen);

function selectProps(forms){
  return function(formName){
    return forms[formName];
  }
}