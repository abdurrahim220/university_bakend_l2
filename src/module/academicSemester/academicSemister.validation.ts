import { z } from 'zod';
import { months } from './academicSemester.interface';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'Semester name is required',
      invalid_type_error: 'Invalid semester name',
    }),
    code: z.enum(['01', '02', '03'], {
      required_error: 'Semester code is required',
      invalid_type_error: 'Invalid semester code',
    }),
    year: z.string({
      required_error: 'Year is required',
    }),
    startMonth: z.enum(months, {
      required_error: 'Start month is required',
      invalid_type_error: 'Invalid month',
    }),
    endMonth: z.enum(months, {
      required_error: 'End month is required',
      invalid_type_error: 'Invalid month',
    }),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterValidationSchema,
};
