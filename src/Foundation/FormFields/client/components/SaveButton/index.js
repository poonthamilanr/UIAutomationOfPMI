import React from 'react';
import i18n from 'i18next';
import { Button } from '@pmi/dsm-react-bs4';
import SpinnerButtonIcon from '@pmi/dsm-react-bs4/dist/components/icons/animated/SpinnerButtonIcon';

export const SaveButton = props => (
  <Button
    className={props.className ? props.className : 'ml-2'}
    variant="primary"
    disabled={props.saving}
    onClick={props.onClick}
    titleText={props.saving ? i18n.t('cert-app.Common.Saving') : props.label}
    icon={props.saving ? SpinnerButtonIcon : null}
    iconAlign="right"
  />
);