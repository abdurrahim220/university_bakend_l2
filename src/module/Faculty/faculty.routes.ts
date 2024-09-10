import express from 'express';
import { facultyController } from './faculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateCreateFacultyValidationSchema } from './faculty.validation';

const router = express.Router();

router.get('/', facultyController.getAllFaculty);
router.get('/:id', facultyController.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(updateCreateFacultyValidationSchema),
  facultyController.updateFaculty,
);
router.delete('/:id', facultyController.deleteFacultyFromDB);

export const FacultyRouter = router;
