import React from 'react';
import { connect } from 'react-redux';
import { withSitecoreContext, Text } from '@sitecore-jss/sitecore-jss-react';
import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import { getExperienceResources } from 'foundation/Application/client/Application/accessors';
import { getListsSettings, getGlobalSettings } from 'foundation/SitecoreSettings/client/accessors';
import Heading from 'feature/PageComponents/client/components/Heading';
import NewWindowIcon from '@pmi/dsm-react-bs4/dist/components/icons/16/NewWindowIcon';
import './experiencePdf.scss';
import { Row, Col } from 'react-bootstrap';


class ExperiencWorkTypePdf extends React.Component {

  getDisplayDate(value, sitecoreList) {
    if (!value || !sitecoreList || !sitecoreList.Months) {
      return "";
    }

    const splitedDate = value.split('T')[0].split('-');
    const date = new Date(Date.UTC(splitedDate[0], parseInt(splitedDate[1], 10) - 1, splitedDate[2]));
    const month = sitecoreList.Months[date.getUTCMonth()].displayName;
    const year = date.getUTCFullYear();

    return `${month} ${year}`;
  }

  experienceWorkTypeItemPdfView(experience) {
    const { sitecoreListsSettings, fields } = this.props;
    return (
      <div className="row experience-download_item m-0" key={experience._links.self.href}>
        <div className="col-md-8">
          {`${experience.projectTitle} - ${this.getDisplayDate(experience.startDate, sitecoreListsSettings)} - ${this.getDisplayDate(experience.endDate, sitecoreListsSettings)}`}
        </div>
        <div className="col-md-4">
          <a href={experience._links.experience_audit_pdf.href} target="_blank" rel="noopener noreferrer" className="btn with-icon btn-outline-primary">
            <span className="col-md-10"><Text field={fields.EditModeViewPdf} /></span>
            <NewWindowIcon />
          </a>
        </div>
      </div>
    );

  }

  experienceWorkTypePdfView(experienceArray, fields) {
    if (!experienceArray || experienceArray.length === 0) {
      return null;
    }

    return (
      <Row className="mt-5">
        <Col>
          <Heading fields={fields} />
          <div className="experience-download">
            {experienceArray && experienceArray.map(experience => (
              this.experienceWorkTypeItemPdfView(experience)
            ))}
          </div>
        </Col>
      </Row>
    );
  }


  render() {
    const { experienceArray, fields } = this.props;

    if (!fields) return <div className="static-height" />;

    if (!experienceArray || experienceArray.length === 0 && !isPageSimulation()) {
      return null;
    }

    return (
      <>
        {this.experienceWorkTypePdfView(experienceArray.filter(exp => exp.workExperienceTypeEnum === fields.Worktype.fields.ApiKey.value), fields)}
      </>
    );
  }
}

const mapStateToProps = state => ({
  experienceArray: getExperienceResources(state),
  sitecoreListsSettings: getListsSettings(state),
  sitecoreSettings: getGlobalSettings(state),
});

export default withSitecoreContext()(connect(mapStateToProps)(ExperiencWorkTypePdf));
