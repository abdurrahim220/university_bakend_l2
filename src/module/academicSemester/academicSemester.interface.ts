
export type TAcademicSemester = {
  name: 'Autumn' | 'Summer' | 'Fall';
  code: '01' | '02' | '03';
  year: string;
  startMonth: TMonth;
  endMonth: TMonth;
};


export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const; // Make `months` a tuple of string literals

export type TMonth = (typeof months)[number];