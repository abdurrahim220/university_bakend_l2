import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { academicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyController.createAcademicFaculty,
);
router.get('/all', academicFacultyController.getAlAcademicFaculty);
router.get('/single/:id', academicFacultyController.getSingleAcademicFaculty);
router.patch(
  '/update/:id',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  academicFacultyController.updateAcademicFaculty,
);

export const academicFacultyRoutes = router;
