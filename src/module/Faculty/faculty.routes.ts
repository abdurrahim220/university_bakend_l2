import express from 'express';
import { facultyController } from './faculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateCreateFacultyValidationSchema } from './faculty.validation';

const router = express.Router();

router.get('/all', facultyController.getAllFaculty);
router.get('/single/:id', facultyController.getSingleFaculty);
router.patch(
  '/update/:id',
  validateRequest(updateCreateFacultyValidationSchema),
  facultyController.updateFaculty,
);
router.delete('/delete/:id', facultyController.deleteFacultyFromDB);

export const FacultyRouter = router;
