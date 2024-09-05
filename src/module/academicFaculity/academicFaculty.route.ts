import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { academicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyController.createAcademicFaculty,
);
router.get(
  '/get-all-academic-faculty',
  academicFacultyController.getAlAcademicFaculty,
);
router.get(
  '/get-academic-faculty/:id',
  academicFacultyController.getSingleAcademicFaculty,
);
router.patch(
  '/update-academic-faculty/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema),
  academicFacultyController.updateAcademicFaculty,
);

export const academicFacultyRoutes = router;
