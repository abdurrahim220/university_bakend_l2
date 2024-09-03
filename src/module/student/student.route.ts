import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// will call controller
router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getSingleStudent);
router.delete('/:studentId', StudentController.deleteStudent);

export const studentRoute = router;
