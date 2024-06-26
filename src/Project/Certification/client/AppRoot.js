import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from "react-redux";
import { LocalizationProvider } from '@progress/kendo-react-intl';
import { SitecoreContextGlobalValue } from 'foundation/Infrastructure/client/SitecoreContext/setSitecoreContext';
import store from "./store";
import componentFactory from './componentFactory';
import RouteHandler from './RouteHandler';
import HealthCheck from '../../../Foundation/Infrastructure/client/HealthCheck';
import { KENDO_MESSAGES_LANGUAGE } from './i18n-kendo';

// This is the main JSX entry point of the app invoked by the renderer (server or client rendering).
// By default the app's normal rendering is delegated to <RouteHandler> that handles the loading of JSS route data.

// support languages in the URL prefix
// e.g. /da-DK/path, or /en/path, or /path
export const routePatterns = [
  '/:lang([a-z]{2}-[A-Z]{2})/:sitecoreRoute*',
  '/:lang([a-z]{2})/:sitecoreRoute*',
  '/:sitecoreRoute*',
];

// wrap the app with:
// ApolloProvider: provides an instance of Apollo GraphQL client to the app to make Connected GraphQL queries.
//    Not needed if not using connected GraphQL.
// SitecoreContext: provides component resolution and context services via withSitecoreContext
// Router: provides a basic routing setup that will resolve Sitecore item routes and allow for language URL prefixes.
class AppRoot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ssrRenderComplete: false,
    };

    if (props.ssrState) {
      this.sitecoreContext =
        props.ssrState.sitecore && props.ssrState.sitecore.route
          ? {
            route: props.ssrState.sitecore.route,
            itemId: props.ssrState.sitecore.route.itemId,
            ...props.ssrState.sitecore.context,
          }
          : props.ssrState.sitecore.context;
    } else {
      this.sitecoreContext = null;
    }
  }

  setSsrRenderComplete = (ssrRenderComplete) =>
    this.setState({
      ssrRenderComplete,
    });

  componentDidMount() {
    this.setSsrRenderComplete(true);
  }

  render() {
    const { path, Router, graphQLClient } = this.props;
    return (
      <Provider store={store}>
        <ApolloProvider client={graphQLClient}>
          <LocalizationProvider language={KENDO_MESSAGES_LANGUAGE}>
            <SitecoreContext componentFactory={componentFactory} context={this.sitecoreContext}>
              <Router location={path} context={{}}>
                <Switch>
                  <Route key="healthcheck" path="/healthcheck" render={() => <HealthCheck />} />
                  {routePatterns.map((routePattern) => (
                    <Route
                      key={routePattern}
                      path={routePattern}
                      render={(props) => (
                        <RouteHandler route={props} ssrRenderComplete={this.state.ssrRenderComplete} />
                      )}
                    />
                  ))}
                </Switch>
              </Router>
              <SitecoreContextGlobalValue />
            </SitecoreContext>
          </LocalizationProvider>
        </ApolloProvider>
      </Provider>
    );
  }
};

export default AppRoot;