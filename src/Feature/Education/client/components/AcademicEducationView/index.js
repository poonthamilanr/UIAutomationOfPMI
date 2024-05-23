import React from 'react';
import { connect } from 'react-redux';
import { getAcademicEducation } from 'foundation/Application/client/Application/accessors';
import { getListsSettings } from 'foundation/SitecoreSettings/client/accessors';
import AcademicEducationView from "../AcademicEducation/view";

class AcademicEducation extends React.Component {

  formatSettings(settings) {
    return {
      academicEducationLevels: settings.AcademicEducationLevels,
      fieldOfStudy: settings.FieldOfStudy,
    }
  }

  render() {
    const { academicEducation, sitecoreListsSettings, fields } = this.props;
    const settings = sitecoreListsSettings && this.formatSettings(sitecoreListsSettings);

    if (!fields) return <div className="static-height"/>;
    return (
      <>
        {settings && academicEducation && (<AcademicEducationView
          academicEducation={academicEducation}
          settings={settings}
          hideChangeOption={true}
          fields={fields}
        />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  academicEducation: getAcademicEducation(state),
  sitecoreListsSettings: getListsSettings(state),
});

export default connect(mapStateToProps, null)(AcademicEducation);