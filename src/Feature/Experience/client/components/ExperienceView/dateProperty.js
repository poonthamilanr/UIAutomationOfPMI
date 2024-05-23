import React from 'react';
import i18n from 'i18next';
import Property from './property';

const getDisplayDate = (value, sitecoreList) => {
  if (!value || !sitecoreList || !sitecoreList.Months) {
    return "";
  }

  const splitedDate = value.split('T')[0].split('-');
  const date = new Date(Date.UTC(splitedDate[0], parseInt(splitedDate[1], 10) - 1, splitedDate[2]));
  const month = sitecoreList.Months[date.getUTCMonth()].displayName;
  const year = date.getUTCFullYear();

  return `${month}, ${year}`;
}

export const getDisplayDatePeriod = (dateFrom, dateTo, sitecoreList) => {
  if (!dateFrom)
    return null;

  if (!dateTo)
    return `${getDisplayDate(dateFrom, sitecoreList)} - ${i18n.t('cert-app.Common.InProgress')}`;

  return `${getDisplayDate(dateFrom, sitecoreList)} - ${getDisplayDate(dateTo, sitecoreList)}`;
}

class DateProperty extends React.PureComponent {

  render() {
    const { endDate, label, startDate, sitecoreList } = this.props;

    return (
      <Property
        label={label}
        value={getDisplayDatePeriod(startDate, endDate, sitecoreList)}
      />
    );
  }
}

export default DateProperty;
