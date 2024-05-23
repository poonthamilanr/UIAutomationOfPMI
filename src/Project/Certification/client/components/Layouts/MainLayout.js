import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Container } from 'react-bootstrap';
import PageLoader from 'foundation/FormFields/client/components/PageLoader';

const MainLayout = ({ route }) => (
  <div className="layout">
    <Placeholder name="cert-app-header" rendering={route} />
    <Container id="main-layout" className="dsm layout__main">
      <Placeholder name="cert-app-top" rendering={route} />
      <Placeholder name="cert-app-main" rendering={route} />
      <Placeholder name="cert-app-bottom" rendering={route} />
      <PageLoader />
    </Container>
    <Placeholder name="cert-app-footer" rendering={route} />
  </div>
);

export default MainLayout;
