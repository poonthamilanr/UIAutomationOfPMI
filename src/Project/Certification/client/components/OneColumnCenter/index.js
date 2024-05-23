import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Row, Col } from 'react-bootstrap';

const OneColumnCenter = ({rendering}) => (
  <Row className="justify-content-center">
    <Col md={8}>
      <Placeholder name="cert-app-main-content" rendering={rendering}/>
    </Col>
  </Row>
);

export default OneColumnCenter;