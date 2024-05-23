import * as Yup from 'yup';

const getDefaultValidationSchema = (fields) => Yup.object().shape({
  projectTitle: Yup.string()
    .required(getValue(fields, 'TitleIsRequired'))
    .max(80),
  company: Yup.string()
    .required(getValue(fields, 'OrganizationIsRequired'))
    .max(60),
  jobTitle: Yup.string()
    .required(getValue(fields, 'JobTitleIsRequired'))
    .max(100),
  functionalAreaTypeEnum: Yup.string().nullable()
    .required(getValue(fields, 'FunctionalReportingAreaIsRequired')),
  functionalAreaTypeOther: Yup.string().nullable()
    .when("functionalAreaTypeEnum", {
      is: (value) => value === 'Other',
      then: Yup.string().required(getValue(fields, 'FunctionalReportingAreaIsRequired')),
    }),
  primaryFocusTypeEnum: Yup.string().nullable()
    .required(getValue(fields, 'OrganizationPrimaryFocusIsRequired')),
  primaryFocusTypeOther: Yup.string().nullable()
    .when("primaryFocusTypeEnum", {
      is: (value) => value === 'Other',
      then: Yup.string().required(getValue(fields, 'OrganizationPrimaryFocusIsRequired')),
    }),
  startDate: Yup.string()
    .required(getValue(fields, 'StartDateIsRequired')),
  endDate: Yup.mixed()
    .test('is-required', getValue(fields, 'EndDateIsRequired'), val => !!val || val === null)
    .test('is-bigger', getValue(fields, 'EndDateMustBeLaterThanTheStartDate'), function (endDate) {
      const { startDate } = this.parent;
      return startDate && endDate ? new Date(startDate) <= new Date(endDate) : true;
    }),
  description: Yup.string()
    .required(getValue(fields, 'DescriptionIsRequired')),
});

export const getProjectValidationSchema = (fields, workflowType) => {
  let validationSchema = getDefaultValidationSchema(fields);

  if (workflowType !== 'PMI_SP' && workflowType !== 'PMI_RMP' && workflowType !== 'PfMP' && workflowType !== 'CPBEP') {
    validationSchema = validationSchema.concat(
      Yup.object().shape({
        methodologyEnum: Yup.string().nullable()
          .required(getValue(fields, 'ApproachIsRequired')),
        teamSizeEnum: Yup.string().nullable()
          .required(getValue(fields, 'TeamSizeIsRequired')),
        budgetRangeEnum: Yup.string().nullable()
          .required(getValue(fields, 'BudgetIsRequired')),
      }),
    );
  }
  if (workflowType === 'PfMP') {
    validationSchema = validationSchema.concat(
      Yup.object().shape({
        description: null,
      }),
    );
  }
  if (workflowType === 'CPBEP') {
    validationSchema = validationSchema.concat(
      Yup.object().shape({
        primaryFocusTypeEnum: null,
        primaryFocusTypeOther: null,
        functionalAreaTypeEnum: null,
        functionalAreaTypeOther: null,
      }),
    );
  }

  return validationSchema;
}

export const getAgileValidationSchema = (fields) => {
  const validationSchema = getDefaultValidationSchema(fields);
  return validationSchema.concat(
    Yup.object().shape({
      teamSizeEnum: Yup.string().nullable()
        .required(getValue(fields, 'TeamSizeIsRequired')),
      agileMethodologyEnum: Yup.string().nullable()
        .test('enum-or-other-required', getValue(fields, 'ApproachIsRequired'), function (agileMethodologyEnum) {
          return Boolean(agileMethodologyEnum || this.parent.agileMethodologyOther);
        }),
      agileMethodologyOther: Yup.string().nullable()
        .test('other-or-enum-required', getValue(fields, 'ApproachIsRequired'), function (agileMethodologyOther) {
          return Boolean(agileMethodologyOther || this.parent.agileMethodologyEnum);
        }),
      description: Yup.string()
        .required(getValue(fields, 'DescriptionIsRequired')),
    }),
  );
}

export const getBusinessAnalysisValidationSchema = (fields) => {
  const validationSchema = getDefaultValidationSchema(fields);
  return validationSchema.concat(
    Yup.object().shape({
      methodologyEnum: Yup.string().nullable()
        .required(getValue(fields, 'ApproachIsRequired')),
      description: Yup.string()
        .required(getValue(fields, 'DescriptionIsRequired')),
    }),
  );
}

export const getPortfolioValidationSchema = (fields) => {
  const validationSchema = getDefaultValidationSchema(fields);
  return validationSchema.concat(
    Yup.object().shape({
      description: Yup.string()
        .required(getValue(fields, 'DescriptionIsRequired')),
      portfolioCount: Yup.number()
        .required(getValue(fields, 'PortfolioCountIsRequired'))
        .positive(getValue(fields, 'PortfolioCountPositiveNumber')),
    }),
  );
}

export const getProgramValidationSchema = (fields) => {
  const validationSchema = Yup.object().shape({
    projectTitle: Yup.string()
      .required(getValue(fields, 'TitleIsRequired'))
      .max(80),
    company: Yup.string()
      .required(getValue(fields, 'OrganizationIsRequired'))
      .max(60),
    jobTitle: Yup.string()
      .required(getValue(fields, 'JobTitleIsRequired'))
      .max(100),
    functionalAreaTypeEnum: Yup.string().nullable()
      .required(getValue(fields, 'FunctionalReportingAreaIsRequired')),
    functionalAreaTypeOther: Yup.string().nullable()
      .when("functionalAreaTypeEnum", {
        is: (value) => value === 'Other',
        then: Yup.string().required(getValue(fields, 'FunctionalReportingAreaIsRequired')),
      }),
    primaryFocusTypeEnum: Yup.string().nullable()
      .required(getValue(fields, 'OrganizationPrimaryFocusIsRequired')),
    primaryFocusTypeOther: Yup.string().nullable()
      .when("primaryFocusTypeEnum", {
        is: (value) => value === 'Other',
        then: Yup.string().required(getValue(fields, 'OrganizationPrimaryFocusIsRequired')),
      }),
    budgetRangeEnum: Yup.string().nullable()
      .required(getValue(fields, 'BudgetIsRequired')),
    directReports: Yup.number()
      .required(getValue(fields, 'NumberOfDirectReportsIsRequired'))
      .moreThan(-0.1, getValue(fields, 'NumberOfDirectReportsPositiveNumber')),
    pmReports: Yup.number()
      .required(getValue(fields, 'DirectPMReportsIsRequired'))
      .moreThan(-0.1, getValue(fields, 'DirectPMReportsPositiveNumber')),
    startDate: Yup.string()
      .required(getValue(fields, 'StartDateIsRequired')),
    endDate: Yup.mixed()
      .test('is-required', getValue(fields, 'EndDateIsRequired'), val => !!val || val === null)
      .test('is-bigger', getValue(fields, 'EndDateMustBeLaterThanTheStartDate'), function (endDate) {
        const { startDate } = this.parent;
        return startDate && endDate ? new Date(startDate) <= new Date(endDate) : true;
      }),
    description: Yup.string().nullable()
      .required(getValue(fields, 'DescriptionIsRequired')),
  });

  return validationSchema;
}

export const getValidationSchemaByExperienceType = (fields, experienceType, workflowType) => {
  if (experienceType === 'Project') return getProjectValidationSchema(fields, workflowType);
  if (experienceType === 'Agile') return getAgileValidationSchema(fields);
  if (experienceType === 'BusinessAnalysis') return getBusinessAnalysisValidationSchema(fields);
  if (experienceType === 'Portfolio') return getPortfolioValidationSchema(fields);
  if (experienceType === 'Program') return getProgramValidationSchema(fields);
  return null;
}

export const appendEndDate = (experience) => ({endDate: '2200-01-01', ...experience});

const getValue = (fields, name) => fields[name] ? fields[name].value : '';
