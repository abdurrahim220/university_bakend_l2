import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { updatedCreateStudentZodValidationSchema } from './student.zod.validation';

const router = express.Router();

// will call controller
router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getSingleStudent);

router.patch(
  '/:studentId',
  validateRequest(updatedCreateStudentZodValidationSchema),
  StudentController.updateStudent,
);

router.delete('/:studentId', StudentController.deleteStudent);

export const studentRoute = router;
