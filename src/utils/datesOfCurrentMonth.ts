import * as moment from 'moment';

export async function getFirstAndLastDayOfMonth(todayDate): Promise<any> {
  const startOfMonthCurrentDate = moment(todayDate)
    .startOf('month')
    .format('MM/DD/YYYY');
  const endOfMonthCurrentDate = moment(todayDate)
    .endOf('month')
    .format('MM/DD/YYYY');
  return { start: startOfMonthCurrentDate, end: endOfMonthCurrentDate };
}
