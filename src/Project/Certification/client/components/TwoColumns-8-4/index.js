/* eslint-disable */
import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Row, Col } from 'react-bootstrap';

const TwoColumns_8_4 = ({rendering}) => (
    <Row>
        <Col md={8}>
            <Placeholder name="cert-app-main-content" rendering={rendering}/>
        </Col>
        <Col md={4}>
            <Placeholder name="cert-app-aside-content" rendering={rendering}/>
        </Col>
    </Row>
);
  
export default TwoColumns_8_4;