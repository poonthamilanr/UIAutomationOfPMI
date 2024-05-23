import React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { compose } from 'redux';
import Cookies from 'js-cookie';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { getNavigationsSettings } from 'foundation/SitecoreSettings/client/accessors';
import * as profileApiActions from 'foundation/Profile/client/Image/actions';
import * as navigationApiActions from 'foundation/Navigation/client/Navigation/actions';
import { getProfileImageUrl } from 'foundation/Profile/client/Image/accessors';
import { getLogoutAccountMenuItem, getAccountMenuItems } from 'foundation/Navigation/client/Navigation/accessors';
import withNavigationsSettings from 'foundation/SitecoreSettings/client/NavigationsSettings';
import IconChevronDown from '@pmi/dsm-react-bs4/dist/components/icons/16/chevron/DownIcon';
import IconDashboard from '@pmi/dsm-react-bs4/dist/components/icons/16/DashboardIcon';
import IconLogOff from '@pmi/dsm-react-bs4/dist/components/icons/16/LogOffIcon';
import IconCertification from '@pmi/dsm-react-bs4/dist/components/icons/16/CertificationIcon';
import IconUser from '@pmi/dsm-react-bs4/dist/components/icons/16/UserIcon';
import IconGroup from '@pmi/dsm-react-bs4/dist/components/icons/16/GroupIcon';
import IconNewsfeed from '@pmi/dsm-react-bs4/dist/components/icons/16/NewsfeedIcon';
import { ReactComponent as IconCompass } from 'assets/icons/compass-filled.svg';
import { ReactComponent as IconBook } from 'assets/icons/book.svg';
import Check from '@pmi/dsm-react-bs4/dist/components/icons/16/CheckIcon';

class AccountMenu extends React.Component {
  accountMenuIcon(icon) {
    switch (icon) {
    case '':
      return <IconDashboard height={20} width={20} />;
    case 'Account':
      return <IconUser height={20} width={20} />;
    case 'Certification':
      return <IconCertification height={20} width={20} />;
    case 'Membership':
      return <IconGroup height={20} width={20} />;
    case 'Subscriptions':
      return <IconNewsfeed height={20} width={20} />;
    case 'Career Navigator':
      return <IconCompass height={20} width={20} />;
    case 'Library':
      return <IconBook height={20} width={20} />;
    case 'LogOut':
      return <IconLogOff height={20} width={20} />;
    default:
      return <Check height={20} width={20} />;
    }
  }

  componentDidMount() {
    const { fetchProfileImageUrl, fetchNavigation, navAccMenuItems } = this.props;
    if(navAccMenuItems === undefined)
    {
      fetchProfileImageUrl();
      fetchNavigation();
    }
  }

  toggleMobileBodyClass = (isOpen) => {
    const mobileWidth = window.innerWidth <= 767;
    const mobileClass = 'modal-open';

    if (mobileWidth) {
      if (isOpen) {
        document.body.classList.add(mobileClass);
      } else {
        document.body.classList.remove(mobileClass);
      }
    }
  }

  clearCookies() {
    Cookies.remove('authToken');
  }

  renderMenu = () => {
    const { navigationsSettings, logoutAccountMenuItem } = this.props;

    if (!navigationsSettings || !navigationsSettings.myPMI) {
      return null;
    }

    const logoutUrl = logoutAccountMenuItem ? logoutAccountMenuItem.url : "";
    const { myPMI } = navigationsSettings;

    return (
      <Dropdown.Menu className="account-menu" aria-labelledby="pmi-my-account-menu">
        {myPMI.menuItems.map(menuItem => (
          <Dropdown.Item
            href={menuItem.linkPurpose.value === "Logout"? logoutUrl : menuItem.link.url}
            key={menuItem.name}
            className="account-menu__item"
            onClick={menuItem.linkPurpose.value === "Logout" ? this.clearCookies : null}
          >
            <span className="account-menu__item-icon">
              {this.accountMenuIcon(menuItem.iconName.value)}
            </span>
            <span className="account-menu__item-label">{menuItem.displayName}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    );
  }

  render() {
    const { navigationsSettings, profileImageUrl } = this.props;

    const menuTitle = navigationsSettings && navigationsSettings.myPMI.displayName;

    return (
      <Dropdown
        id="pmi_account"
        className="pmi-my-account"
        alignRight
        onToggle={this.toggleMobileBodyClass}
      >
        <Dropdown.Toggle
          variant="link"
          className="pmi-my-account__button"
          id="pmi-my-account-menu"
        >
          <span className="pmi-my-account__photo">
            <img src={profileImageUrl} alt=""/>
          </span>
          <span className="pmi-my-account__label">{menuTitle}</span>
          <IconChevronDown height={14} width={14} className="pmi-my-account__arrow" />
        </Dropdown.Toggle>
        {this.renderMenu()}
      </Dropdown>
    );
  }
}

const mapStateToProps = state => ({
  navigationsSettings: getNavigationsSettings(state),
  profileImageUrl: getProfileImageUrl(state),
  logoutAccountMenuItem: getLogoutAccountMenuItem(state),
  navAccMenuItems: getAccountMenuItems(state),
});

const mapDispatchToProps = dispatch => ({
  fetchProfileImageUrl: () => dispatch(profileApiActions.fetchProfileImageUrl()),
  fetchNavigation: () => dispatch(navigationApiActions.fetchNavigation()),
});

export default compose(
  withSitecoreContext(),
  withNavigationsSettings,
  connect(mapStateToProps, mapDispatchToProps),
)(AccountMenu);