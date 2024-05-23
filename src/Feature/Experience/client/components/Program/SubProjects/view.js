import React from 'react';
import { LinkButton } from '@pmi/dsm-react-bs4';
import { connect } from 'react-redux';
import i18n from 'i18next';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import IconPencil from '@pmi/dsm-react-bs4/dist/components/icons/16/PencilIcon';
import IconBin from '@pmi/dsm-react-bs4/dist/components/icons/16/BinIcon';
import * as apiActions from 'foundation/Application/client/Experience/actions';
import * as uiActions from './actions';
import RemoveModal from './removeModal';
import { getDisplayDatePeriod } from '../../ExperienceView/dateProperty';
import '../../Experience/experience.scss';

class SubprojectView extends React.Component {
  state = {
    isShowModal: false,
  };

  handleModal = () => {
    const { isShowModal } = this.state;
    this.setState({ isShowModal: !isShowModal });
  };

  handleRemoveClick = () => {
    const { project, removeSubProject } = this.props;
    removeSubProject(project._links.self.href);
    this.handleModal();
  };

  handleEditClick = () => {
    const { openEditForm, project } = this.props;
    openEditForm(project._links.self.href);
  };

  render() {
    const { index, project, editable, sitecoreListsSettings } = this.props;
    const { fields } = this.props.fields.ProjectSubForm;
    const lists = sitecoreListsSettings || {};
    const { isShowModal } = this.state;

    return (
      <div className="experience-program__projects-view">
        <div className="row align-items-center">
          <div className="col-8">
            <span className="project-title">
              <Text field={fields.ViewModeProject} /> {index + 1}
            </span>
            <span>{getDisplayDatePeriod(project.startDate, project.endDate, lists)}</span>
          </div>

          <div className="col-4 experience__buttons">
            {editable && (
              <>
                <LinkButton
                  className="with-icon link-base align-self-end text-nowrap mr-3"
                  disabled={!editable}
                  onClick={this.handleModal}
                  icon={IconBin}
                  titleText={i18n.t('cert-app.Common.Remove')}
                />
                <LinkButton
                  className="with-icon link-base align-self-end text-nowrap"
                  disabled={!editable}
                  onClick={this.handleEditClick}
                  icon={IconPencil}
                  titleText={fields.EditLabel.value}
                />
              </>
            )}
          </div>

          <RemoveModal show={isShowModal} onHide={this.handleModal} onRemove={this.handleRemoveClick} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  openEditForm: ref => dispatch(uiActions.setOpenRef(ref)),
  removeSubProject: data => dispatch(apiActions.deleteSubProject(data)),
});

export default connect(
  null,
  mapDispatchToProps // eslint-disable-line comma-dangle
)(SubprojectView);
