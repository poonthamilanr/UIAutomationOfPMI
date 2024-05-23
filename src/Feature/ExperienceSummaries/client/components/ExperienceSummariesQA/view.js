import React from 'react';
import { connect } from 'react-redux';
import { LinkButton } from '@pmi/dsm-react-bs4';
import IconPencil from '@pmi/dsm-react-bs4/dist/components/icons/16/PencilIcon';
import IconChevronDown from '@pmi/dsm-react-bs4/dist/components/icons/16/chevron/DownIcon';
import IconChevronUp from '@pmi/dsm-react-bs4/dist/components/icons/16/chevron/UpIcon';
import Property from 'feature/Experience/client/components/ExperienceView/property';
import { getExperience } from 'foundation/Application/client/Experience/accessors';

class ExperienceSummariesQAView extends React.Component {
  state = {
    isOpen: true,
  };

  getDisplayAnswerOption = (question) => {
    switch (question.answer.option) {
    case 'A': return question.optionA;
    case 'B': return question.optionB;
    default : return '';
    }
  }

  getDisplayExperience = (question) => {
    const experiences = this.props.experiences || [];
    const experience = experiences.find(experience => experience.id === question.answer.experienceId);
    return (experience && experience.projectTitle) || '';
  }

  handleEditClick = () => {
    const { question, openEditForm } = this.props;
    openEditForm(question._links.self.href);
  }

  handleCollapse = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  render() {
    const { fields, question } = this.props;
    const { isOpen } = this.state;

    return (
      <div className='experience experience-summaries'>
        <div className='experience__header'>
          <span>{question.title}</span>
          <LinkButton
            className="with-icon ml-auto link-base"
            onClick={this.handleCollapse}
            icon={isOpen ? IconChevronDown : IconChevronUp}
          />
        </div>
        {isOpen && (
          <>
            <div className='experience__body'>
              <p className='text-value-bold text-value-bold_gray'>{this.getDisplayAnswerOption(question)}</p>
              <Property
                label={fields && fields.ViewModeExperienceReferenced.value}
                value={this.getDisplayExperience(question)}
              />
              <Property
                label={fields && fields.ViewModeSummary.value}
                value={question.answer.answer}
              />
            </div>
            <div className='experience__buttons'>
              <LinkButton
                className='with-icon link-base align-self-end text-nowrap'
                onClick={this.handleEditClick}
                icon={IconPencil}
                titleText={fields && fields.EditSummary.value}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  experiences: getExperience(state),
});

export default connect(mapStateToProps)(ExperienceSummariesQAView);
