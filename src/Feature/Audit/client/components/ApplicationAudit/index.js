import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withSitecoreContext, Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Row, Col } from 'react-bootstrap';
import * as applicationActions from "foundation/Application/client/Application/actions";
import * as loaderActions from "foundation/FormFields/client/components/PageLoader/actions";
import { getApplication, getApplicationRequestIdle } from 'foundation/Application/client/Application/accessors';
import withGlobalSettings from 'foundation/SitecoreSettings/client/GlobalSettings';
import withListsSettings from 'foundation/SitecoreSettings/client/ListsSettings';

class ApplicationAudit extends React.Component {
  componentDidMount() {
    const { applicationData, fetchApplicationData, hideLoader, getApplicationRequestIdle } = this.props;
    hideLoader();
    if (!applicationData && getApplicationRequestIdle) {
      fetchApplicationData();
    }
  }

  render() {
    const { rendering, params } = this.props;
    let isFullView = 0;
    if(params)
    {
      isFullView = params.isFullView ? params.isFullView : params.IsFullView;
    }

    return (
      <>
        <Row className={isFullView ? "mb-3" : "border-top mt-5 mb-3"}>
          <Col md={isFullView ? 12 : 8} className={isFullView ?"" :"mt-5"}>
            <Placeholder name="cert-app-audit-section-one" rendering={rendering} />
          </Col>
        </Row>
        <Row className={isFullView ? "" : "border-top"}>
          <Col md={8} className="mt-5">
            <Placeholder name="cert-app-audit-section-two" rendering={rendering} />
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = state => ({
  applicationData: getApplication(state),
  getApplicationRequestIdle: getApplicationRequestIdle(state),
});

const mapDispatchToProps = dispatch => ({
  fetchApplicationData: () => dispatch(applicationActions.fetchAuditApplication()),
  hideLoader: () => dispatch(loaderActions.hidePageLoader()),
});

export default compose(
  withSitecoreContext(),
  withListsSettings,
  withGlobalSettings,
  connect(mapStateToProps, mapDispatchToProps),
)(ApplicationAudit);
