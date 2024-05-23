import React from 'react';
import { connect } from 'react-redux';
import { getAcademicEducation } from 'foundation/Application/client/AcademicEducation/accessors';
import { getListsSettings } from 'foundation/SitecoreSettings/client/accessors';
import { getIsOpen } from './accessors';
import AcademicEducationView from "./view";
import AcademicEducationEdit from "./edit";

class AcademicEducation extends React.Component {

  formatSettings(settings) {
    return {
      academicEducationLevels: settings.AcademicEducationLevels,
      fieldOfStudy: settings.FieldOfStudy,
    }
  }

  render() {
    const { academicEducation, isOpen, sitecoreListsSettings, fields } = this.props;
    const settings = sitecoreListsSettings && this.formatSettings(sitecoreListsSettings);

    if (!fields) return <div className="static-height"/>;

    if (!settings) {
      return null;
    }

    return (
      isOpen ?
        <AcademicEducationEdit
          education={academicEducation}
          settings={settings}
          fields={fields}
        /> :
        <AcademicEducationView
          academicEducation={academicEducation}
          settings={settings}
          fields={fields}
        />
    );
  }
}

const mapStateToProps = state => ({
  academicEducation: getAcademicEducation(state),
  isOpen: getIsOpen(state),
  sitecoreListsSettings: getListsSettings(state),
});

export default connect(mapStateToProps, null)(AcademicEducation);