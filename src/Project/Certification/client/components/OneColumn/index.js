import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Row, Col } from 'react-bootstrap';

const OneColumn = ({rendering}) => (
  <Row>
    <Col>
      <Placeholder name="cert-app-main-content" rendering={rendering}/>
    </Col>
  </Row>
);

export default OneColumn;