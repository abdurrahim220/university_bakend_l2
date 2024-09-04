import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidation } from './academicSemister.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);
router.get(
  '/get-all-academic-semester',
  AcademicSemesterControllers.getAllAcademicSemester,
);
router.get(
  '/get-all-academic-semester/:id',
  AcademicSemesterControllers.getSingleAcademicSemester,
);
router.patch(
  '/get-all-academic-semester/:id',
  AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
