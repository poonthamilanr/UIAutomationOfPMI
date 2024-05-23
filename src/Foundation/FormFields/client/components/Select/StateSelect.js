import React from 'react';
import { connect } from 'react-redux';
import {
  getCountriesInfo,
  getAllCountries,
  getFilteredCountries,
  getFilteredStatesStatus,
  getFilteredStates } from "foundation/Profile/client/Metadata/countries/accessors";
import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import * as actions from "foundation/Profile/client/Metadata/countries/actions";
import { SelectField } from "./SelectField";
import { InputField } from '../InputField';

class StateSelectBase extends React.PureComponent {
  componentDidMount() {
    const { fetchStates, countryCode } = this.props;
    if(countryCode && countryCode !== null && countryCode !== '')
    {
      fetchStates(countryCode);
    }
  }

  render() {
    const { countriesData, excludeEmbargoed, countryCode, dispatch, ...props } = this.props;
    const countries = excludeEmbargoed ? getFilteredCountries(countriesData) : getAllCountries(countriesData);

    if (!countries) {
      return <InputField {...props}/>
    }

    const apiStatus = getFilteredStatesStatus(countriesData);
    const stateData = getFilteredStates(countriesData);
    const options = (stateData) ? stateData.map(state => ({
      label: state.stateName,
      value: state.stateCode,
    })) : [];

    if (!options.length) {
      return <InputField {...props}/>
    }
    return <SelectField
      options={options}
      loading={apiStatus === ApiStatus.Fetching}
      {...props}
    />
  }
}

const mapStateToProps = state => {
  return {
    countriesData: getCountriesInfo(state),
  }
};

const mapDispatchToProps = dispatch => ({
  fetchStates: (countryCode) => dispatch(actions.fetchFilteredStates(countryCode)),
});

export const StateSelect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StateSelectBase);
