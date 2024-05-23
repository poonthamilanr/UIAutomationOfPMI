import React from 'react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import { fetchAuthToken } from "foundation/Security/client/api";
import Cookies from 'js-cookie';

class AuthBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {authRequested: false};
  }

  componentDidMount() {
    const { route } = this.props;

    if (!isPageSimulation() && !route.fields.AllowAnonymous.value && !this.state.authRequested) {
      this.setState({authRequested: true});
      if (!Cookies.get('authToken') || route.fields.IsStartPage.value) {
        fetchAuthToken()
          .then((authToken) => {
            if (authToken && authToken !== 'null') {
              Cookies.set('authToken', authToken);
              this.forceUpdate();
            }
          })
          .catch((err) => {
            console.error('err', err);
          });
      }
    }
  }

  render() {
    const { children, route } = this.props;
    const authToken = Cookies.get('authToken');
    const authenticated = authToken || isPageSimulation() || route.fields.AllowAnonymous.value;

    return authenticated ? children : null;
  }
}

const Auth = withSitecoreContext()(AuthBase);

export default Auth;