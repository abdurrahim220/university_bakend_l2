import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic department must be string',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic faculty must be string',
      required_error: 'Faculty is required',
    }),
  }),
});
const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic department must be string',
    }).optional(),
    academicFaculty: z.string({
      invalid_type_error: 'Academic faculty must be string',
      required_error: 'Faculty is required',
    }).optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
