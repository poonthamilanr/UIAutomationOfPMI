import React from 'react';
import { connect } from 'react-redux';
import { getAccreditedUniversities, getAccreditedUniversitiesStatus } from "foundation/Profile/client/Metadata/accreditedUniversities/accessors";
import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import * as actions from "foundation/Profile/client/Metadata/accreditedUniversities/actions";
import { SelectAutoCompleteField } from "./SelectAutoCompleteField";

class InstitutionSelectBase extends React.PureComponent {
  componentDidMount() {
    const { fetchUniversities } = this.props;

    fetchUniversities();
  }

  setUniversity = value => {
    const { universitiesData, onUniversitySet } = this.props;

    const university = universitiesData.find(u=>u.schoolName === value);
    const isGAC = value ? !!university : null;

    if (onUniversitySet) {
      onUniversitySet(isGAC, university);
    }
  };

  render() {
    const { universitiesData, apiStatus, autocompleteEnabled } = this.props;
    const extractName = university => university.schoolName;
    const universities = (universitiesData || []).map(extractName);
    const options = autocompleteEnabled ? universities : [];

    return <SelectAutoCompleteField
      options={options}
      loading={apiStatus === ApiStatus.Fetching}
      onChange={this.setUniversity}
      {...this.props}
    />
  }
}

const mapStateToProps = state => ({
  universitiesData: getAccreditedUniversities(state),
  apiStatus: getAccreditedUniversitiesStatus(state),
});

const mapDispatchToProps = dispatch => ({
  fetchUniversities: () => dispatch(actions.fetchAccreditedUniversities()),
});

export const InstitutionSelect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InstitutionSelectBase);

