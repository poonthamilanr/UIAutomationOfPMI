import React from 'react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import withListsSettings from 'foundation/SitecoreSettings/client/ListsSettings';
import { connect } from 'react-redux';
import * as loaderActions from "foundation/FormFields/client/components/PageLoader/actions";
import AuditInformationInfo from './view';
import './auditinformation.scss';

class AuditInformation extends React.PureComponent {

  componentDidMount() {
    const { hideLoader } = this.props;
    hideLoader();
  }

  render() {
    const { fields, rendering } = this.props;

    if (!fields) return <div className="static-height"/>;

    return(
      <AuditInformationInfo fields={fields} rendering={rendering} />
    );
  }
}

const WithListSettings = withListsSettings(AuditInformation);
const WithSitecoreContext = withSitecoreContext()(WithListSettings);

const mapDispatchToProps = dispatch => ({
  hideLoader: () => dispatch(loaderActions.hidePageLoader()),
});

export default connect(null, mapDispatchToProps)(WithSitecoreContext);