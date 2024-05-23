import React from 'react';
import { connect } from 'react-redux';
import { withSitecoreContext, Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import { getExperienceResources } from 'foundation/Application/client/Application/accessors';
import { getListsSettings, getGlobalSettings } from 'foundation/SitecoreSettings/client/accessors';


class ExperiencePdf extends React.PureComponent {

  render() {
    const { experienceArray, rendering } = this.props;

    if (!experienceArray || experienceArray.length === 0 && !isPageSimulation()) {
      return null;
    }

    return (
      <div><Placeholder name="cert-app-experience-pdf" rendering={rendering} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  experienceArray: getExperienceResources(state),
  sitecoreListsSettings: getListsSettings(state),
  sitecoreSettings: getGlobalSettings(state),
});

export default withSitecoreContext()(connect(mapStateToProps)(ExperiencePdf));
