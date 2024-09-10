import express from 'express';
import { UserController } from './user.controller';
import { createStudentZodValidationSchema } from '../student/student.zod.validation';
import validateRequest from '../../middleware/validateRequest';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentZodValidationSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserController.createFaculty,
);

export const userRouter = router;
