import React from 'react';
import { connect } from 'react-redux';
import {
  getCountriesInfo,
  getAllCountries,
  getFilteredCountries,
  getAllCountriesStatus,
  getFilteredCountriesStatus } from "foundation/Profile/client/Metadata/countries/accessors";
import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import * as actions from "foundation/Profile/client/Metadata/countries/actions";
import { SelectField } from "./SelectField";

class CountrySelectBase extends React.PureComponent {
  componentDidMount() {
    const { fetchCountries, excludeEmbargoed } = this.props;
    fetchCountries(excludeEmbargoed);
  }

  onChange = (option) => {
    if (this.props.onChange) {
      const { countriesData, fetchStates } = this.props;
      const countryes = getAllCountries(countriesData) || [];
      const country = countryes.find(country => country.countryCode3 === option.value);
      fetchStates(option.value);
      this.props.onChange(option, country);
    }
  }

  render() {
    const { countriesData, excludeEmbargoed, defaultSelection, disableCountry,disableText } = this.props;
    const countries = excludeEmbargoed ? getFilteredCountries(countriesData) : getAllCountries(countriesData);
    const apiStatus = excludeEmbargoed ? getFilteredCountriesStatus(countriesData) : getAllCountriesStatus(countriesData);
    const options = countries ? countries.map(country => ({
      label: country.country,
      value: country.countryCode3,
    })) : [];
    if(countries !== null && countries !== undefined)
    {
      if(defaultSelection !== undefined)
      {
        options.unshift({
          label: defaultSelection,
          value:'',
        });
      }
      if(disableCountry !== undefined && disableCountry !== '')
      {
        disableCountry.split('|').forEach(item => {
          if(item !== '')
          {
            const countryItem = options.find(countryItem => countryItem.value === item);
            if(countryItem !== null && countryItem !== undefined)
            {
              countryItem.label = `${countryItem.label} ${disableText}`;
              countryItem["disabled"] = true;
            }
          }
        });
      }
    }

    return <SelectField
      options={options}
      loading={apiStatus === ApiStatus.Fetching}
      {...this.props}
      onChange={this.onChange}
    />
  }
}

const mapStateToProps = state => {
  return {
    countriesData: getCountriesInfo(state),
  }
};

const mapDispatchToProps = dispatch => ({
  fetchCountries: (excludeEmbargoed) => {
    if (excludeEmbargoed) {
      dispatch(actions.fetchFilteredCountries())
    } else {
      dispatch(actions.fetchAllCountries())
    }
  },
  fetchStates: (countryCode) => dispatch(actions.fetchFilteredStates(countryCode)),
});

export const CountrySelect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountrySelectBase);
