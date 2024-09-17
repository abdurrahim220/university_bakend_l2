import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { academicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  academicDepartmentController.createAcademicDepartment,
);
router.get(
  '/all',
  academicDepartmentController.getAlAcademicDepartment,
);
router.get(
  '/single/:id',
  academicDepartmentController.getSingleAcademicDepartment,
);
router.patch(
  '/update/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentController.updateAcademicDepartment,
);

export const academicDepartmentRoutes = router;
