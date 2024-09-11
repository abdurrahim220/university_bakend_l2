import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { updatedCreateStudentZodValidationSchema } from './student.zod.validation';

const router = express.Router();

// will call controller
router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getSingleStudent);

router.patch(
  '/:id',
  validateRequest(updatedCreateStudentZodValidationSchema),
  StudentController.updateStudent,
);

router.delete('/:id', StudentController.deleteStudent);

export const studentRoute = router;
