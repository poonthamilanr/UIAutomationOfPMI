import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Container } from 'react-bootstrap';
import i18n from 'i18next';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { getCertType } from "foundation/Application/client/certtype-storage";
import logo from 'assets/icons/pmi_logo.png';
import logoMobile from 'assets/icons/pmi_logo_mobile.png';
import { getGlobalSettings } from 'foundation/SitecoreSettings/client/accessors';
import { getUrlParameter } from "foundation/Page/client/utils";
import config from 'foundation/Config/client';
import withGlobalSettings from 'foundation/SitecoreSettings/client/GlobalSettings';
import { isAuthorized } from "foundation/Security/client/utils";
import AccountMenu from './AccountMenu';

const getCertTypeShortName = (sitecoreSettings) => {
  const certType = getUrlParameter('certtype') || getCertType();
  if (!sitecoreSettings || !certType) {
    return "";
  }
  const certification = sitecoreSettings.certTypes.find(cert => cert.name && (cert.name.toLowerCase() === certType.toLowerCase()));
  const isAuditPage = window.location.pathname.indexOf('audit') !== -1;
  const certificationShortTitle = certification ? certification.shortTitle.value : "";
  return certification && certification.isMicroCredential.value ? certificationShortTitle :
    `${certificationShortTitle} ${i18n.t('cert-app.Common.Application')} ${isAuditPage ? i18n.t('cert-app.Audit.Common.Audit') : ''}`
}

const HeaderContent = ({ sitecoreSettings, sitecoreContext }) => {
  const fields = sitecoreContext && sitecoreContext.route && sitecoreContext.route.fields;
  const hasTitle = isAuthorized() && fields && fields.ShowTitle && fields.ShowTitle.value;
  const hasAccountMenu = isAuthorized() && fields && fields.ShowAccountMenu && fields.ShowAccountMenu.value;
  return (
    <header className="dsm app-header">
      <Container>
        <a href={config.sitecoreInstanceUrl} className="app-header__logo">
          <img src={logo} alt={i18n.t('cert-app.Common.ProjectManagementInstitute')} className="d-none d-md-block" />
          <img src={logoMobile} alt={i18n.t('cert-app.Common.ProjectManagementInstitute')} className="d-md-none" />
        </a>
        {hasTitle && (
          <h1 className="h2 app-header__title">
            {`${getCertTypeShortName(sitecoreSettings)}`}
          </h1>
        )}
        <div className="app-header__controls">
          {hasAccountMenu && (
            <AccountMenu />
          )}
        </div>
      </Container>
    </header>
  );
};

const mapStateToProps = state => ({
  sitecoreSettings: getGlobalSettings(state),
});

export default compose(
  withSitecoreContext(),
  withGlobalSettings,
  connect(mapStateToProps),
)(HeaderContent);