import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import './styles.scss';

class SectionAccordion extends React.PureComponent {
  toggleAccordion = id => {
    const element = document.querySelector(`#${id} .auditSectionAccordionCard-header h2`);
    if (element) {
      element.classList.toggle('collapsed');
    }
  };

  render() {
    const { id, startOpen, showHeader, showBody } = this.props;

    return (
      <Accordion className="auditSectionPanel border-bottom" id={id} defaultActiveKey={startOpen ? '0' : null}>
        <Card className="auditSectionAccordionCard">
          <Accordion.Toggle
            className="auditSectionAccordionCard-header"
            as={Card.Header}
            eventKey="0"
            onClick={() => this.toggleAccordion(id)}
          >
            <>{showHeader()}</>
          </Accordion.Toggle>
          <Accordion.Collapse className="auditSectionAccordionCard-body" eventKey="0">
            <>{showBody()}</>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default SectionAccordion;
