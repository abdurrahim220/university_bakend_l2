import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { updatedCreateStudentZodValidationSchema } from './student.zod.validation';

const router = express.Router();

// will call controller
router.get('/all', StudentController.getAllStudents);
router.get('/single/:id', StudentController.getSingleStudent);

router.patch(
  'update/:id',
  validateRequest(updatedCreateStudentZodValidationSchema),
  StudentController.updateStudent,
);

router.delete('/delete/:id', StudentController.deleteStudent);

export const studentRoute = router;
