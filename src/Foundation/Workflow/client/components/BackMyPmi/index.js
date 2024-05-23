import React from 'react';
import i18n from 'i18next';
import { LinkButton } from '@pmi/dsm-react-bs4';
import { getSitecoreContext } from 'foundation/Infrastructure/client/SitecoreContext/setSitecoreContext';
import { ReactComponent as ArrowLeft } from 'assets/icons/arrow-left.svg';

class BackMyPmiComponent extends React.PureComponent {

  render() {
    const { appRedirects } = getSitecoreContext();
    const redirectUrls = appRedirects.redirectLinks;
    return (
      <>
        <LinkButton
          className='mr-auto'
          icon={ArrowLeft}
          href={redirectUrls.MyPmiDashboard}
          titleText={i18n.t('cert-app.PageComponents.CloseApplication.BackmyPMI')}
          size='xs'
          variant='link'/>
      </>
    );
  }
}


export default BackMyPmiComponent;

