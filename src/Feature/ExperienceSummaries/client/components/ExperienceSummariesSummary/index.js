import React from 'react';
import { connect } from 'react-redux';
import CircleCheck from '@pmi/dsm-react-bs4/dist/components/icons/16/CircleCheckIcon';
import { getAppExperienceSummariesRequirementsAnswerDetails } from 'foundation/Application/client/ExperienceSummaries/accessors';

class ExperienceSummariesSummary extends React.PureComponent {
  render() {
    const { answerDetails } = this.props;

    if (!answerDetails) {
      return null;
    }

    return (
      <div className="experience-summaries-summary">
        {answerDetails.map((item, i) => (
          <div className="experience-summaries-summary-line" key={`${i}-${item.questionId}`}>
            <div className={`${item.isAnswered ? 'answered' : ''}`}>{item.questionTitle}</div>
            {item.isAnswered && <CircleCheck className='btn-icon' />}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  answerDetails: getAppExperienceSummariesRequirementsAnswerDetails(state),
});

export default connect(mapStateToProps)(ExperienceSummariesSummary);