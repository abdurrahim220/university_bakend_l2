import express from 'express';
import { UserController } from './user.controller';
import { createStudentZodValidationSchema } from '../student/student.zod.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentZodValidationSchema),
  UserController.createStudent,
);

export const userRouter = router;
