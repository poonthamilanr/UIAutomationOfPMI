import * as Yup from 'yup';

export const getValidationSchema = (fields) => Yup.object().shape({
  'option': Yup.string().required(fields && fields.OptionIsRequired.value),
  'experienceId': Yup.number().required(fields && fields.ExperienceReferencedIsRequired.value)
    .positive(fields && fields.ExperienceReferencedIsRequired.value),
  'answer': Yup.string().required(fields && fields.AnswerIsRequired.value),
});