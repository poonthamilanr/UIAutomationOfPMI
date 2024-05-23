/* eslint-disable */
import React from 'react';
import {  VisitorIdentification, Placeholder } from '@sitecore-jss/sitecore-jss-react';
import Helmet from 'react-helmet';
import MainLayout from './Layouts/MainLayout';
import TranslatedHeader from './Header';

import 'bootstrap/scss/bootstrap.scss';
import 'assets/styles/app.scss';

const Layout = ({ route, configSettings }) => (
  <>
    {/* react-helmet enables setting <head> contents, like title and OG meta tags */}
    {(() => {
        if(configSettings !== undefined && configSettings.configs !== undefined && configSettings.configs.AdobeDatalayer !== "") 
        {
          return     (<Helmet script={[
            {"src": configSettings.configs.AdobeFramework, "type": "text/javascript", "async": true},
            {"src": configSettings.configs.AdobeDatalayer, "type": "text/javascript"},
            {"src": configSettings.configs.EventListener, "type": "text/javascript"}          
          ]}> <title>
          {(route.fields && route.fields.pageTitle && route.fields.pageTitle.value) || 'Page'}
        </title>
          </Helmet>);
        }
        else
        {
         return (<Helmet>
          <title>
            {(route.fields && route.fields.pageTitle && route.fields.pageTitle.value) || 'Page'}
          </title>
          </Helmet>);
        }
      })()}

    {/*
      VisitorIdentification is necessary for Sitecore Analytics to determine if the visitor is a robot.
      If Sitecore XP (with xConnect/xDB) is used, this is required or else analytics will not be collected for the JSS app.
      For XM (CMS-only) apps, this should be removed.
      VI detection only runs once for a given analytics ID, so this is not a recurring operation once cookies are established.
    */}
    <VisitorIdentification />

    {/* <TranslatedHeader /> */}
    {/* root placeholder for the app, which we add components to using route data */}
    {/* <div className="container">
      <Placeholder name="jss-main" rendering={route} />
    </div> */}

    <MainLayout route={route} />
  </>
);

export default Layout;
