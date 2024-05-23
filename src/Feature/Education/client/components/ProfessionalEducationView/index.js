import React from 'react';
import { connect } from 'react-redux';
import { withSitecoreContext, Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import { getProfEducationResources } from 'foundation/Application/client/Application/accessors';
import { getListsSettings, getGlobalSettings } from 'foundation/SitecoreSettings/client/accessors';
import ProfessionalEducationView from "../ProfessionalEducation/view";

class ProfessionalEducation extends React.Component {

  professionalEducationView(education, sitecoreSettings, sitecoreListsSettings, fields) {
    return (
      <ProfessionalEducationView
        key={education._links.self.href}
        education={education}
        sitecoreSettings={sitecoreSettings}
        sitecoreListsSettings={sitecoreListsSettings}
        hideChangeOption={true}
        fields={fields}
      />
    );
  }

  render() {
    const { educationArray, sitecoreListsSettings, sitecoreSettings, rendering, fields } = this.props;

    if (!fields) return <div className="static-height"/>;

    if (!isPageSimulation() && (!educationArray || educationArray.length === 0)) {
      return null;
    }

    return (
      <div className="mt-5"><Placeholder name="cert-app-education-header" rendering={rendering} />
        {educationArray && educationArray.map(education => (
          this.professionalEducationView(education, sitecoreSettings, sitecoreListsSettings, fields)
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  educationArray: getProfEducationResources(state),
  sitecoreListsSettings: getListsSettings(state),
  sitecoreSettings: getGlobalSettings(state),
});

export default withSitecoreContext()(connect(mapStateToProps)(ProfessionalEducation));
