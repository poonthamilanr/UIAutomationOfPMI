import React from 'react';
import { connect } from 'formik';
import { trackFormSubmission, trackFormError, trackFormFocus } from 'foundation/Analytics/client/AdobeAnalytics/accessors';

function FormTracking(props) {
  const formSubmissionTracking = () => {
    if(props.formik.submitCount > 0 && props.formik.isSubmitting && !props.formik.isValidating && (props.formik.errors === null || Object.keys(props.formik.errors).length === 0))
    {
      trackFormSubmission(props.formName);
    }
    else if(props.formik.submitCount > 0 && !props.formik.isSubmitting && !props.formik.isValid)
    {
      trackFormError(props.formName, props.formik.errors);
    }
  };

  const formStartTrackTracking = () => {
    if(props.formStartState)
    {
      trackFormFocus(props.formName);
    }
  };

  React.useEffect(formSubmissionTracking, [props.formik.submitCount, props.formik.isSubmitting, props.formik.isValidating]);
  React.useEffect(formStartTrackTracking, [props.formStartState]);
  return null;
}

export default connect(FormTracking);