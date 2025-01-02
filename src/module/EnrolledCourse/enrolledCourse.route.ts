import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { EnrolledCourseValidation } from './enrolledCourse.validation';
import { EnrolledCourseController } from './enrolledCourse.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(EnrolledCourseValidation.createEnrolledCourseZodSchema),
  EnrolledCourseController.createEnrolledCourse,
);

export const EnrolledCourseRoutes = router;
