import { getIn } from 'formik';

export const isFieldTouched = (form, fieldName) => {
  return getIn(form.touched, fieldName);
};

export const getFieldValue = (form, fieldName) => {
  return getIn(form.values, fieldName);
};

export const getFieldError = (form, fieldName) => {
  if (!fieldName) {
    return undefined;
  }
  const wasTouched = isFieldTouched(form, fieldName);
  return form.submitCount || wasTouched ? getIn(form.errors, fieldName) : undefined;
};

export const getElementId = (controlType, fieldName, index) => {
  return `${fieldName}_${controlType}${index != null ? `_${index}` : ''}`;
};

export const getUniqueId = () => {
  return Math.random().toString(36).substr(2, 10);
};