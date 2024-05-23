/* eslint-disable */
import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Row, Col } from 'react-bootstrap';

const ThreeColumns = ({rendering}) => (
    <Row>
        <Col md={4}>
            <Placeholder name="cert-app-col-one" rendering={rendering}/>
        </Col>
        <Col md={4}>
            <Placeholder name="cert-app-col-two" rendering={rendering}/>
        </Col>
		<Col md={4}>
            <Placeholder name="cert-app-col-three" rendering={rendering}/>
        </Col>
    </Row>
);
  
export default ThreeColumns;