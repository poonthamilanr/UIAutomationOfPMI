/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import { getFooterSettings, getGlobalSettings } from 'foundation/SitecoreSettings/client/accessors';

class FooterContent extends React.PureComponent {
  render() {
    const { footerSettings, globalSettings } = this.props;

    if (!(footerSettings && globalSettings)) {
      return null;
    }

    const footerText = globalSettings.globalSettings.footerText.value || '';
    const footerMenuItems = footerSettings.FooterLinks.menuItems || [];
    const footerTexts = footerText.split(/[\n]+/);

    return (
      <footer className="app-footer">
        <Container>
          <Row>
            <Col xl={9}>
              <ul className="list-inline">
                {footerTexts.map((text, i) => (
                  <li className="list-inline__item" key={`footerText-${i}`}>
                    <span className="list-inline__text">{text}</span>
                  </li>
                ))}
              </ul>
            </Col>
            <Col xl={3}>
              <ul className="list-inline list-inline_right">
                {footerMenuItems.map((item, i) => (
                  <li className="list-inline__item" key={`footerLink-${i}`}>
                    <a href={item.link.jss.value.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="list-inline__link"
                    >
                      {item.link.jss.value.text}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

const mapStateToProps = state => ({
  footerSettings: getFooterSettings(state),
  globalSettings: getGlobalSettings(state),
});

export default connect(mapStateToProps)(FooterContent);