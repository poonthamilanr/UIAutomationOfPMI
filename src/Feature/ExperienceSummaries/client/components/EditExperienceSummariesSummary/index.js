import React from 'react';
import { connect } from 'react-redux';
import CircleCheck from '@pmi/dsm-react-bs4/dist/components/icons/16/CircleCheckIcon';
import { getExperienceSummariesEntity } from 'foundation/Application/client/ExperienceSummaries/accessors';

class EditExperienceSummariesSummary extends React.PureComponent {
  render() {
    const { experienceSummaries } = this.props;

    if (!experienceSummaries) {
      return null;
    }

    return (
      <div className="experience-summaries-summary">
        {experienceSummaries.map((item, i) => (
          <div className="experience-summaries-summary-line" key={`${i}-${item.id}`}>
            <div className={`${item.answer.updated ? 'answered' : ''}`}>{item.title}</div>
            {item.answer.updated && <CircleCheck className='btn-icon' />}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  experienceSummaries: getExperienceSummariesEntity(state),
});

export default connect(mapStateToProps)(EditExperienceSummariesSummary);