import React from 'react';
import { connect } from 'react-redux';
import { Text, RichText, Image, Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import { getUrlParameter } from 'foundation/Page/client/utils';
import { getListsSettings } from 'foundation/SitecoreSettings/client/accessors';
import './auditinformation.scss';

const renderDescription = ({sitecoreListsSettings, fields }) => {
  if(!isPageSimulation())
  {
    let auditDateParamValue = getUrlParameter('auditDate');
    if(auditDateParamValue.indexOf('%') !== -1)
    {
      auditDateParamValue = auditDateParamValue.substring(0,auditDateParamValue.indexOf('%'));
    }
    else if(auditDateParamValue.indexOf(' ') !== -1)
    {
      auditDateParamValue = auditDateParamValue.substring(0,auditDateParamValue.indexOf(' '));
    }
    const auditDateValue = new Date(auditDateParamValue);
    if (auditDateValue.getTime() >= 0 && sitecoreListsSettings) {
      const auditDateFormat = `${auditDateValue.getDate()} ${sitecoreListsSettings.Months[auditDateValue.getMonth()].displayName} ${auditDateValue.getFullYear()}`;
      const description = {
        value: fields.Description.value.replace("{auditDate}", auditDateFormat),
      }
      return ( <RichText className="auditinformation__description" field={description} />  );
    }
  }
  return ( <RichText className="auditinformation__description" field={fields.Description} /> );
}

const AuditInformationInfo = ({ sitecoreListsSettings, fields, rendering }) => (
  <div className={`auditinformation ${!fields ? 'p-3' : ''}`}>
    {fields && (
      <>
        <Image
          className="auditinformation__image"
          media={fields.Icon}
          width="50px"
          height="50px"
        />
        <div className="auditinformation__description-wrapper">
          <Text tag="h2" field={fields.Title} />
          {renderDescription({sitecoreListsSettings, fields})}
        </div>
      </>
    )}
    <div className="auditinformation__description-component-placeholder">
      <Placeholder name="cert-app-information-component" rendering={rendering}/>
    </div>
  </div>
);

const mapStateToProps = state => ({
  sitecoreListsSettings: getListsSettings(state),
});

export default connect(mapStateToProps)(AuditInformationInfo);