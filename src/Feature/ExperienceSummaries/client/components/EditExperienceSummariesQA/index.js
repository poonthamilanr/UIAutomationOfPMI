import React from 'react';
import { connect } from 'react-redux';
import { getGlobalSettings } from 'foundation/SitecoreSettings/client/accessors';
import { getExperienceSummariesEntity } from 'foundation/Application/client/ExperienceSummaries/accessors';
import * as apiActions from 'foundation/Application/client/ExperienceSummaries/actions';
import * as uiActions from './actions';
import { getOpenRefs } from './accessors';
import ExperienceSummariesQAEdit from '../ExperienceSummariesQA/edit';
import ExperienceSummariesQAView from '../ExperienceSummariesQA/view';

class EditExperienceSummariesQA extends React.PureComponent {
  render() {
    const {
      closeEditForm,
      experienceSummaries,
      fields,
      openRefs,
      openEditForm,
      saveExperienceSummariesAnswer,
      sitecoreSettings,
    } = this.props;
    const isOpen = question => question.answer && openRefs[question._links.self.href];

    if (!fields) return <div className="static-height"/>;

    if (!experienceSummaries || !sitecoreSettings) {
      return null;
    }

    return (
      <>
        {experienceSummaries.map(question => (
          isOpen(question) ?
            <ExperienceSummariesQAEdit
              closeEditForm={closeEditForm}
              key={question._links.self.href}
              fields={fields}
              question={question}
              saveExperienceSummariesAnswer={saveExperienceSummariesAnswer}
              sitecoreSettings={sitecoreSettings}
            /> :
            <ExperienceSummariesQAView
              key={question._links.self.href}
              fields={fields}
              question={question}
              openEditForm={openEditForm}
            />
        ))}
      </>
    );
  }
}

const mapStateToProps = state => ({
  experienceSummaries: getExperienceSummariesEntity(state),
  openRefs: getOpenRefs(state),
  sitecoreSettings: getGlobalSettings(state),
});

const mapDispatchToProps = dispatch => ({
  closeEditForm: (data) => dispatch(uiActions.clearOpenRef(data)),
  openEditForm: (data) => dispatch(uiActions.setOpenRef(data)),
  saveExperienceSummariesAnswer: (data) => dispatch(apiActions.saveExperienceSummariesAnswer(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExperienceSummariesQA);