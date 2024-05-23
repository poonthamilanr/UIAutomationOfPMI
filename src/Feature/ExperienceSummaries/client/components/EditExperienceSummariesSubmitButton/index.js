import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Button } from '@pmi/dsm-react-bs4';
import i18n from 'i18next';
import { getIsExperienceSummarieceNotUpdated, getIsExperienceSummarieceEntity } from 'foundation/Application/client/ExperienceSummaries/accessors';
import { submitExperienceSummaries } from 'foundation/Application/client/ExperienceSummaries/actions';

class EditExperienceSummariesSubmitButton extends React.Component {
  onSubmit = () => {
    const { history, submitExperienceSummaries } = this.props;

    submitExperienceSummaries({ history });
  }

  renderText = () => {
    const { fields } = this.props;

    if (fields && fields.Title) {
      return fields.Title.value;
    }
    return i18n.t('cert-app.PageComponents.ContinueButton.Resubmit');
  }

  render() {
    const { isDisabled, isExperienceSummaries } = this.props;

    if (isExperienceSummaries) {
      return null;
    }

    return (
      <div className="form-action-row border-top">
        <Button
          disabled={isDisabled}
          onClick={this.onSubmit}
          size="lg"
          variant="primary"
          titleText={this.renderText()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isDisabled: getIsExperienceSummarieceNotUpdated(state),
  isExperienceSummaries: getIsExperienceSummarieceEntity(state),
});

const mapDispatchToProps = dispatch => ({
  submitExperienceSummaries: (data) => dispatch(submitExperienceSummaries(data)),
});

const experienceSummariesSubmitButton = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditExperienceSummariesSubmitButton));

export default experienceSummariesSubmitButton;