import React from 'react';
import { connect } from 'react-redux';
import { getApplication } from 'foundation/Application/client/Application/accessors';

class Analytics extends React.Component {
  executedOnce = false;

  componentDidMount() {

  }

  render() {
    const { fields, params, appData } = this.props;

    let isNewApplication = false;
    let htmlContent;
    if (!fields && !params) return null;

    if (appData) {
      isNewApplication = appData.isNewApplication;
    }

    try {

      if(params)
      {
        htmlContent = params.content ? params.content : params.Content;
      }
      else
      {
        htmlContent = fields.Content.value;
      }

      if (isNewApplication && !this.executedOnce) {
        const scripts = document.createRange().createContextualFragment(htmlContent);
        const head = document.getElementsByTagName('head')[0];
        head.appendChild(scripts);

        this.executedOnce = true;
      }

    } catch (err) {
      console.error(err);
    }
    return null;
  }

};

const mapStateToProps = state => {
  return { appData: getApplication(state) };
};

export default connect(mapStateToProps, null)(Analytics);