const workflowTypeKey = 'workflow_type';
const certTypeKey = 'cert_type';

// Get workflowType from storage
export const getWorkflowType = () => {
  if (typeof sessionStorage === 'undefined')
    return undefined;

  return sessionStorage.getItem(workflowTypeKey);
};

// Get certType from storage
export const getCertType = () => {
  if (typeof sessionStorage === 'undefined')
    return undefined;

  return sessionStorage.getItem(certTypeKey);
};

// Save workflowType and certType to storage
export const saveWorkflowAndCertType = (types) => {
  const { workflowType, certType } = types;
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem(workflowTypeKey, workflowType);
    sessionStorage.setItem(certTypeKey, certType);
  }
};
