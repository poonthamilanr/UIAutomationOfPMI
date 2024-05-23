import React from 'react';
import { LinkButton } from '@pmi/dsm-react-bs4';
import classNames from 'classnames';
import i18n from 'i18next';
import { connect } from 'react-redux';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import IconPencil from '@pmi/dsm-react-bs4/dist/components/icons/16/PencilIcon';
import IconBin from '@pmi/dsm-react-bs4/dist/components/icons/16/BinIcon';
import IconChevronDown from '@pmi/dsm-react-bs4/dist/components/icons/16/chevron/DownIcon';
import IconChevronUp from '@pmi/dsm-react-bs4/dist/components/icons/16/chevron/UpIcon';
import * as apiActions from 'foundation/Application/client/Experience/actions';
import RemoveModal from '../Experience/removeModal';
import Property from './property';
import '../Experience/experience.scss';

class ExperienceView extends React.Component {
  state = {
    isOpen: true,
    isShowModal: false,
  };

  handleModal = () => {
    const { isShowModal } = this.state;
    this.setState({ isShowModal: !isShowModal });
  };

  handleRemoveClick = () => {
    const { experience, removeExperience } = this.props;
    removeExperience(experience);
    this.handleModal();
  }

  handleEditClick = () => {
    const { experience, openEditForm } = this.props;
    openEditForm(experience._links.self.href);
  }

  handleCollapse = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  render() {
    const { experience, requirementsMet, fields, labelDescription, noCollapse, hideDescription, children } = this.props;
    const aboveSaveChildren = children.filter(child => child && child.props && !child.props.belowSave);
    const belowSaveChildren = children.filter(child => child && child.props && child.props.belowSave);
    const { isOpen, isShowModal } = this.state;
    const experienceViewClasses = classNames(
      'experience experience__view',
      { 'experience__view-nocollapse': noCollapse },
    );

    return (
      <div className={experienceViewClasses}>
        <div className="experience__header d-flex flex-row">
          <span>{experience.projectTitle}</span>
          {!requirementsMet &&
            <>
              <span className="ml-1 mr-1"> - </span>
              <span className="error"><Text field={fields.ViewModeRequirementsNotMet} /></span>
            </>}
          <LinkButton
            className="with-icon ml-auto link-base"
            onClick={this.handleCollapse}
            icon={isOpen ? IconChevronDown : IconChevronUp}
          />
        </div>
        {isOpen && (
          <>
            <div className="experience__body">
              {aboveSaveChildren}
              {!hideDescription && (
                <div className="mt-2">
                  <Property
                    label={labelDescription}
                    value={experience.description}
                  />
                </div>
              )}
            </div>
            <div className="experience__buttons">
              <LinkButton
                className="with-icon link-base"
                onClick={this.handleModal}
                icon={IconBin}
                titleText={i18n.t('cert-app.Experience.ProjectExperience.RemoveExperience')}
              />
              <LinkButton
                className="with-icon link-base"
                onClick={this.handleEditClick}
                icon={IconPencil}
                titleText={fields && fields.EditLabel.value}
              />
            </div>

            {belowSaveChildren}
          </>
        )}
        <RemoveModal
          show={isShowModal}
          onHide={this.handleModal}
          onRemove={this.handleRemoveClick}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  removeExperience: (data) => dispatch(apiActions.deleteExperience(data)),
});

export default connect(null, mapDispatchToProps)(ExperienceView);
