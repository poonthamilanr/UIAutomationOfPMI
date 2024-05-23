import React from 'react';
import { connect } from 'react-redux';
import { getCountriesInfo, getAllCountries } from "foundation/Profile/client/Metadata/countries/accessors";
import * as actions from "foundation/Profile/client/Metadata/countries/actions";
import { SelectField } from "./SelectField";

class CountrySelectBase extends React.PureComponent {
  componentDidMount() {
    const { fetchCountries } = this.props;
    fetchCountries();
  }

  itemTemplate = (option) => option && `+ ${option.data.code} ${option.label}`;

  selectedValueTemplate = (option) => option && `+ ${option.data.code}`;

  render() {
    const { countriesData } = this.props;
    const countries = getAllCountries(countriesData) || [];
    const options = countries.map(country => ({
      data: {
        id: country.id,
        code: country.internationalDialingCode,
      },
      label: country.country,
      value: country.id,
    }));

    return (
      <SelectField
        options={options}
        itemTemplate={this.itemTemplate}
        selectedValueTemplate={this.selectedValueTemplate}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    countriesData: getCountriesInfo(state),
  }
};

const mapDispatchToProps = dispatch => ({
  fetchCountries: () => dispatch(actions.fetchAllCountries()),
});

export const CountryCodeSelect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountrySelectBase);
