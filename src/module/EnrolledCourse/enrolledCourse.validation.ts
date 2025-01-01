import { z } from 'zod';

const createEnrolledCourseZodSchema = z.object({
  body: z.object({
    offeredCourse: z.string(),
  }),
});

export const EnrolledCourseValidation = {
  createEnrolledCourseZodSchema,
};
