import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { updatedCreateStudentZodValidationSchema } from './student.zod.validation';
import auth from '../../middleware/auth';

const router = express.Router();

// will call controller
router.get('/', auth('admin', 'faculty'), StudentController.getAllStudents);
router.get(
  '/:id',
  auth('admin', 'faculty'),
  StudentController.getSingleStudent,
);

router.patch(
  '/:id',
  auth('admin', 'faculty'),
  validateRequest(updatedCreateStudentZodValidationSchema),
  StudentController.updateStudent,
);

router.delete('/:id', StudentController.deleteStudent);

export const studentRoute = router;
