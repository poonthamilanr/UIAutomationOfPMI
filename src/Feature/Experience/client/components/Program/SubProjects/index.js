import React from 'react';
import i18n from 'i18next';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { LinkButton } from '@pmi/dsm-react-bs4';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-react';
import IconPencil from '@pmi/dsm-react-bs4/dist/components/icons/16/PencilIcon';
import { SaveButton } from 'foundation/FormFields/client/components';
import * as apiActions from 'foundation/Application/client/Experience/actions';
import { getIsSavingStatus } from 'foundation/Application/client/Experience/accessors';
import { getOpenRef } from './accessors';
import SubProjectView from './view';
import SubProjectEdit from './edit';

class SubProjects extends React.PureComponent {
  state = {
    addFormVisible: false,
    isEditMode: false,
  };

  handleAddSubprojectClick = () => {
    this.setState({ addFormVisible: true });
  };

  handleCloseForm = () => {
    this.setState({ addFormVisible: false });
  };

  saveExpereince = experience => e => {
    e.preventDefault();
    this.props.saveCompleteExperience(experience);
    this.setState({ isEditMode: false });
  };

  handleEditProjectsClick = () => {
    this.setState({ isEditMode: true });
  };

  render() {
    const { experience, fields, sitecoreListsSettings, openRef, editable, saving } = this.props;
    const projects = experience.subProjects || [];
    const experienceId = /[^/experience/]*$/.exec(experience._links.self.href)[0];
    const { addFormVisible } = this.state;
    const experienceClasses = classNames('experience__body pb-3', {
      experience__view: !openRef && !addFormVisible && projects.length >= 2,
    });

    const canEdit = this.state.isEditMode || editable;

    return (
      <div className="experience experience-program__projects">
        <div className={experienceClasses}>
          <div className="d-flex justify-content-between">
            <Text
              tag="h2"
              field={canEdit || projects.length < 2 ? fields.ProjectEditSubFormTitle : fields.ProjectViewSubFormTitle}
            />
            {!(canEdit || projects.length < 2) && (
              <LinkButton
                className="with-icon link-base align-self-end text-nowrap mb-3"
                titleText={i18n.t('cert-app.Experience.ProgramExperience.AddOrEditProjects')}
                icon={IconPencil}
                onClick={this.handleEditProjectsClick}
              />
            )}
          </div>
          {(canEdit || projects.length < 2) && (
            <RichText className="information__description" field={fields.ProjectSubFormDescription} />
          )}
          {projects.map(
            (project, i) =>
              project._links.self.href === openRef ? (
                <SubProjectEdit
                  project={project}
                  fields={fields}
                  sitecoreListsSettings={sitecoreListsSettings}
                  editable={canEdit}
                  key={i}
                  index={i}
                />
              ) : (
                <SubProjectView
                  project={project}
                  fields={fields}
                  sitecoreListsSettings={sitecoreListsSettings}
                  editable={canEdit}
                  key={i}
                  index={i}
                />
              ) // eslint-disable-line comma-dangle
          )}
          {projects.length < 1 && (
            <SubProjectEdit
              project={{ experienceId }}
              sitecoreListsSettings={sitecoreListsSettings}
              fields={fields}
              index={0}
              editable={canEdit}
              disableCancel
            />
          )}
          {projects.length < 2 && (
            <SubProjectEdit
              project={{ experienceId }}
              sitecoreListsSettings={sitecoreListsSettings}
              fields={fields}
              index={1}
              editable={canEdit}
              disableCancel
            />
          )}
          {addFormVisible && (
            <SubProjectEdit
              project={{ experienceId }}
              fields={fields}
              sitecoreListsSettings={sitecoreListsSettings}
              index={projects.length}
              handleCloseForm={this.handleCloseForm}
              editable={canEdit}
            />
          )}
          {!addFormVisible && projects.length >= 2 && canEdit && (
            <div className="experience-program__projects-buttons">
              <LinkButton
                className="link-base d-inline-flex mt-3"
                disabled={!canEdit}
                onClick={this.handleAddSubprojectClick}
                titleText={i18n.t('cert-app.Experience.ProgramExperience.AddAdditionalProject')}
              />
            </div>
          )}
        </div>
        {!addFormVisible && projects.length >= 2 && canEdit && !openRef && (
          <div className="experience__body pb-3">
            <div className="experience-program__projects-buttons">
              <SaveButton
                saving={saving}
                label={i18n.t('cert-app.Experience.ProgramExperience.SaveProgram')}
                onClick={this.saveExpereince(experience)}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  openRef: getOpenRef(state),
  saving: getIsSavingStatus(state),
});

const mapDispatchToProps = dispatch => ({
  saveCompleteExperience: data => dispatch(apiActions.saveCompleteExperience(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps // eslint-disable-line comma-dangle
)(SubProjects);
