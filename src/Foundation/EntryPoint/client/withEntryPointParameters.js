import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getGlobalSettings } from 'foundation/SitecoreSettings/client/accessors';
import { getCertType as getStorageCertType } from "foundation/Application/client/certtype-storage";
import { getCertTypeFromRoute } from "foundation/Page/client/utils";
import { saveWorkflowAndCertType } from "foundation/Application/client/certtype-storage";

const withEntryPointParameters = Component => props => {
  const { globalSettings }  = props;

  if (!globalSettings) {
    return null;
  }

  const { certTypes } = globalSettings;
  const certTypeInput = getCertTypeFromRoute() || getStorageCertType() || '';
  const certTypeItem = certTypes.find(({apiKey}) => apiKey.value.toLowerCase() === certTypeInput.toLowerCase());
  const certType = certTypeItem && certTypeItem.name;

  if (certType) {
    let { workflowType } = props;
    if (!workflowType) {
      workflowType = certType;
    }
    saveWorkflowAndCertType({workflowType, certType});
  }

  return (
    <Component {...props} certType={certType}/>
  );
};

const mapStateToProps = state => ({
  globalSettings: getGlobalSettings(state),
});

export default compose(
  connect(mapStateToProps),
  withEntryPointParameters,
);
