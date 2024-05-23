import React from 'react';
import classNames from 'classnames';
import { Text, RichText, Image, Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { connect } from 'react-redux';
import * as loaderActions from "foundation/FormFields/client/components/PageLoader/actions";
import './information.scss';

class Information extends React.PureComponent {

  componentDidMount() {
    const { hideLoader } = this.props;
    hideLoader();
  }

  render() {
    const { fields, isColumn, rendering } = this.props
    const informationClasses = classNames({
      'information-col-wrapper': isColumn,
      'information': !isColumn,
    });

    if (!fields) return <div className="static-height"/>;

    return (
      <div className={informationClasses}>
        {fields && (
          <>
            <Image
              className="information__image"
              media={fields.Icon}
            />
            <div className="information__description-wrapper">
              <Text tag="h2" field={fields.Title} />
              <RichText className="information__description" field={fields.Description} />
            </div>
          </>
        )}
        <div className="information__description-component-placeholder">
          <Placeholder name="cert-app-information-component" rendering={rendering} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  hideLoader: () => dispatch(loaderActions.hidePageLoader()),
});

export default connect(null, mapDispatchToProps)(Information);