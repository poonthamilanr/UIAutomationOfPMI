import React from 'react';
import { connect } from 'react-redux';
import { getAcademicEducation } from 'foundation/Application/client/Application/accessors';
import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import { getListsSettings } from 'foundation/SitecoreSettings/client/accessors';
import { getEnumDisplayName } from 'foundation/SitecoreSettings/client/utils';
import Heading from 'feature/PageComponents/client/components/Heading';

class AcademicEducationViewHeading extends React.Component {

  formatSettings(settings) {
    return {
      academicEducationLevels: settings.AcademicEducationLevels,
      fieldOfStudy: settings.FieldOfStudy,
    }
  }

  render() {
    const { academicEducation, sitecoreListsSettings, fields } = this.props;
    const settings = sitecoreListsSettings && this.formatSettings(sitecoreListsSettings);

    if(fields && settings && academicEducation && !isPageSimulation())
    {
      fields.Description.value = fields.Description.value.replace("{educationLevel}" , getEnumDisplayName(settings.academicEducationLevels, academicEducation.degreeEnum))
    }

    return (<Heading fields={fields} />);
  }
}

const mapStateToProps = state => ({
  academicEducation: getAcademicEducation(state),
  sitecoreListsSettings: getListsSettings(state),
});

export default connect(mapStateToProps, null)(AcademicEducationViewHeading);