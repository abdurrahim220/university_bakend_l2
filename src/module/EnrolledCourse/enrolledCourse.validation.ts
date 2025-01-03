import { z } from 'zod';

const createEnrolledCourseZodSchema = z.object({
  body: z.object({
    offeredCourse: z.string(),
  }),
});

const updateEnrolledCourseMarksValidationZodSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    offeredCourse: z.string(),
    student: z.string(),
    courseMarks: z.object({
      classTest1: z.number().int().min(0).max(10).optional(),
      midTerm: z.number().int().min(0).max(30).optional(),
      classTest2: z.number().int().min(0).max(10).optional(),
      finalTerm: z.number().int().min(0).max(50).optional(),
    }),
  }),
});

export const EnrolledCourseValidation = {
  createEnrolledCourseZodSchema,
  updateEnrolledCourseMarksValidationZodSchema,
};
