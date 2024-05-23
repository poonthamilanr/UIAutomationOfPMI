import React from 'react';
import { connect } from 'react-redux';
import { Button, LinkButton } from '@pmi/dsm-react-bs4';
import IconPencil from '@pmi/dsm-react-bs4/dist/components/icons/16/PencilIcon';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { getCountriesInfo, getAllCountries, getFilteredCountries } from 'foundation/Profile/client/Metadata/countries';
import { getLocationStatus } from 'feature/ExamDetails/client/components/ExamDetails/accessors';
import i18n from 'i18next';
import * as pageActions from "../ExamDetails/actions";

class AddressView extends React.Component {
  getDisplayAddressType(address) {
    const { fields } = this.props;
    const addressType = address && address.AddressType;

    switch (addressType) {
    case 'Home': return fields.AddressTypeHomeAddress.value;
    case 'Work': return fields.AddressTypeWorkAddress.value;
    default : return addressType ? `${addressType} ${fields.AddressTypeAddress.value}` : fields.AddressTypeAddress.value;
    }
  }

  render() {
    const { openForm, address, countriesData, fields, isValidExamLocation } = this.props;
    const countries = countriesData || [];
    let country = '';
    if (address) {
      const conuntryObj = countries.find(data => data.countryCode3 === address.countryCode) || {};
      country = conuntryObj.country || address.countryCode;
    }
    const cssClass = isValidExamLocation ? "view-mode" : "view-mode disable-view";
    return (
      <div className={cssClass}>
        <div className="view-mode__exam">
          <h2><Text field={fields.ViewModeTitle} /></h2>
          {address && (
            <address>
              <p><b>{this.getDisplayAddressType(address)}</b></p>
              <p>{address.address1}</p>
              {address.address2 && <p>{address.address2}</p>}
              <p>{address.city}, {address.state} {address.postalCode}</p>
              <p>{country}</p>
            </address>
          )}
        </div>
        {address && (
          <>
            <LinkButton
              className="btn with-icon link-base d-none d-md-flex"
              onClick={openForm}
              icon={IconPencil}
              titleText={i18n.t('cert-app.ExamDetails.Address.EditAddressLabel')}
            />
            <Button
              variant="outline-primary"
              className="d-md-none mt-2"
              onClick={openForm}
              titleText={i18n.t('cert-app.ExamDetails.Address.EditAddressLabel')}
            />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  countriesData: getAllCountries(getCountriesInfo(state)) || getFilteredCountries(getCountriesInfo(state)),
  isValidExamLocation: getLocationStatus(state),
})

const mapDispatchToProps = dispatch => ({
  openForm: () => dispatch(pageActions.openForm('address')),
});

const addressView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddressView);

export default addressView;
