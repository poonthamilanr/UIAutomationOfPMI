import React from 'react';
import i18n from 'i18next';
import Helmet from 'react-helmet';
import { isEditorActive, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import InitPageLoader from 'foundation/FormFields/client/components/InitPageLoader';
import { layoutServiceFactory } from '../../../Foundation/SitecoreUtils/client/layoutService';
import config from '../../../Foundation/Config/client';
import Auth from './Auth';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import { initKendoMessages } from './i18n-kendo';


/* eslint-disable no-console */

// Dynamic route handler for Sitecore items.
// Because JSS app routes are defined in Sitecore, traditional static React routing isn't enough -
// we need to be able to load dynamic route data from Sitecore after the client side route changes.
// So react-router delegates all route rendering to this handler, which attempts to get the right
// route data from Sitecore - and if none exists, renders the not found component.

class RouteHandler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notFound: true,
      defaultLanguage: config.defaultLanguage,
    };

    const routeData = this.props.sitecoreContext;

    // route data from react-router - if route was resolved, it's not a 404
    if (props.route !== null) {
      this.state.notFound = false;
    }

    // if we have an initial SSR state, and that state doesn't have a valid route data,
    // then this is a 404 route.
    if (routeData && !routeData.route) {
      this.state.notFound = true;
    }

    // if we have an SSR state, and that state has language data, set the current language
    // (this makes the language of content follow the Sitecore context language cookie)
    // note that a route-based language (i.e. /de-DE) will override this default; this is for home.
    if (routeData && routeData.language) {
      this.state.defaultLanguage = routeData.language;
    }

    // tell i18next to sync its current language with the route language
    this.updateLanguage();
  }

  componentDidMount() {
    // if no existing routeData is present (from SSR), get Layout Service fetching the route data or ssr render complete
    if (!this.props.sitecoreContext || this.props.ssrRenderComplete || !this.props.sitecoreContext.route) {
      this.updateRouteData();
    }
  }

  /**
   * Loads route data from Sitecore Layout Service into state.routeData
   */
  updateRouteData() {
    // IE11 polyfill for startsWith
    if (!String.prototype.startsWith) {
      String.prototype.startsWith = function(searchString, position) { // eslint-disable-line no-extend-native
        position = position || 0; // eslint-disable-line no-param-reassign
        return this.substr(position, searchString.length) === searchString;
      };
    }

    let sitecoreRoutePath = this.props.route.match.params.sitecoreRoute || '/';
    if (!sitecoreRoutePath.startsWith('/')) {
      sitecoreRoutePath = `/${sitecoreRoutePath}`;
    }

    const language = this.props.route.match.params.lang || this.state.defaultLanguage;

    // instantiate the dictionary service.
    const layoutServiceInstance = layoutServiceFactory.create();

    // get the route data for the new route
    layoutServiceInstance.fetchLayoutData(sitecoreRoutePath, language).then((routeData) => {
      if (routeData !== null && routeData.sitecore && routeData.sitecore.route) {
        // set the sitecore context data and push the new route
        this.props.updateSitecoreContext({
          route: routeData.sitecore.route,
          itemId: routeData.sitecore.route.itemId,
          ...routeData.sitecore.context,
        });

        if (this.state.notFound) {
          this.setState({ notFound: false });
        }
      } else {
        const { location } = this.props.route;
        const pageNotFoundPath = config.pageNotFoundPath;
        const redirectPathnameMatch = pageNotFoundPath && pageNotFoundPath.match(/^\/[^?]*/);
        const redirectPathname = redirectPathnameMatch && redirectPathnameMatch[0];

        if (redirectPathname && redirectPathname !== location.pathname) {
          window.localStorage.setItem('prevPage', window.location.href);
          this.props.route.history.push(pageNotFoundPath);
        } else {
          this.setState({ notFound: true }, () => {
            const context = routeData && routeData.sitecore ? routeData.sitecore.context : null;
            this.props.updateSitecoreContext(context);
          });
        }
      }
    });
  }

  /**
   * Updates the current app language to match the route data.
   */
  updateLanguage() {
    const newLanguage = this.props.route.match.params.lang || this.state.defaultLanguage;

    if (i18n.language !== newLanguage) {
      i18n.changeLanguage(newLanguage);
      initKendoMessages();
    }
  }

  componentDidUpdate(previousProps) {
    const existingRoute = previousProps.route.match.url;
    const newRoute = this.props.route.match.url;

    // don't change state (refetch route data) if the route has not changed
    if (existingRoute === newRoute) {
      return;
    }

    // if in Sitecore editor - force reload instead of route data update
    // avoids confusing Sitecore's editing JS
    if (isEditorActive()) {
      window.location.assign(newRoute);
      return;
    }

    this.updateLanguage();
    this.updateRouteData();
  }

  render() {
    const { notFound } = this.state;
    const routeData = this.props.sitecoreContext;

    // no route data for the current route in Sitecore - show not found component.
    // Note: this is client-side only 404 handling. Server-side 404 handling is the responsibility
    // of the server being used (i.e. node-headless-ssr-proxy and Sitecore intergrated rendering know how to send 404 status codes).
    if (notFound && routeData && routeData.route) {
      return (
        <div>
          <Helmet>
            <title>{i18n.t('cert-app.Common.PageNotFound')}</title>
          </Helmet>
          <NotFound context={routeData} />
        </div>
      );
    }

    // Don't render anything if the route data or dictionary data is not fully loaded yet.
    // This is a good place for a "Loading" component, if one is needed.
    if (!routeData || !routeData.route) {
      return <InitPageLoader />;
    }

    // Render the app's root structural layout
    // Render the app's root structural layout
    return (
      <Auth route={routeData.route}>
        <Layout route={routeData.route} configSettings={routeData.configSettings} />
      </Auth>
    );
  }
}

export default withSitecoreContext({ updatable: true })(RouteHandler);