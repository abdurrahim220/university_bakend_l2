import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { EnrolledCourseValidation } from './enrolledCourse.validation';
import { EnrolledCourseController } from './enrolledCourse.controller';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  validateRequest(EnrolledCourseValidation.createEnrolledCourseZodSchema),
  EnrolledCourseController.createEnrolledCourse,
);

export const EnrolledCourseRoutes = router;
