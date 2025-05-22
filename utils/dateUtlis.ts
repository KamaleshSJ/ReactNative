import { addDays, format, subDays } from 'date-fns';

export interface DateInfo {
  day: string;
  date: string;
  fullDate: string;
}

export const generateDatesAroundToday = (daysBefore = 30, daysAfter = 30): DateInfo[] => {
  const today = new Date();
  const start = subDays(today, daysBefore);
  const end = addDays(today, daysAfter);
  const dates: DateInfo[] = [];

  let current = start;
  while (current <= end) {
    dates.push({
      day: format(current, 'EEE'),
      date: format(current, 'd'),
      fullDate: format(current, 'yyyy-MM-dd'),
    });
    current = addDays(current, 1);
  }

  return dates;
};