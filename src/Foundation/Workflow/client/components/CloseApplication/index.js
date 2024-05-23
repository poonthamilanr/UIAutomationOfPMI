import React from 'react';
import i18n from 'i18next';
import { Modal, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Button } from '@pmi/dsm-react-bs4';
import { trackGeneralPageLink } from 'foundation/Analytics/client/AdobeAnalytics/accessors'
import * as applicationActions from "foundation/Application/client/Application/actions";
import { getApplication } from 'foundation/Application/client/Application/accessors';
import './closeApplication.scss';

class CloseApplicationComponent extends React.Component {
  state = {
    openModal: false,
  };

  setModelState = (showModal) => () => {
    this.setState({
      openModal: showModal,
    });
  }

  closeApplication = () => {
    const {closeApplication } = this.props;
    const linkTracking = {
      linkTitle: i18n.t('cert-app.PageComponents.CloseApplication.CloseApplication'),
      linkModule: 'close-application',
      targetUrl: '',
    };
    trackGeneralPageLink({linkTracking});
    closeApplication();
  }

  render() {
    const { openModal } = this.state;
    return (
      <>
      <Modal
        show={openModal}
        size="lg"
        dialogClassName="dsm"
        centered
        aria-labelledby="CloseApplicationModalTitle"
        aria-describedby="CloseApplicationModalDesc"
        onHide={this.setModelState(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="CloseApplicationModalTitle" className='closeApplication__header'>
            <Row className='d-flex justify-content-center'>
              {i18n.t('cert-app.PageComponents.CloseApplication.ApplicationClose')}
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body id="CloseApplicationModalDesc">
          <Row className='d-flex justify-content-center'>
            {i18n.t('cert-app.PageComponents.CloseApplication.AppCloseDescription')}
          </Row>
          <Row className='mt-4 d-flex justify-content-center'>
            <Button
              className='mr-4'
              onClick={this.setModelState(false)}
              titleText={i18n.t('cert-app.Common.Cancel')}
              size='lg'
              variant='secondary'/>

            <Button
              onClick={this.closeApplication}
              titleText={i18n.t('cert-app.PageComponents.CloseApplication.CloseApplication')}
              size='lg'
              variant='primary'/>
          </Row>
        </Modal.Body>
      </Modal>
        <Button
          className='mr-4 text-black-50'
          onClick={this.setModelState(true)}
          titleText={i18n.t('cert-app.PageComponents.CloseApplication.NoLongerWantToApply')}
          size='xs'
          variant='link'
          disabled={!this.props.applicationData}/>
      </>
    );
  }
}

const mapStateToProps = state => ({
  applicationData: getApplication(state),
});


const mapDispatchToProps = dispatch => ({
  closeApplication: () => dispatch(applicationActions.closeApplication()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CloseApplicationComponent);

