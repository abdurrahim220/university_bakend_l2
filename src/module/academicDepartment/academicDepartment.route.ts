import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { academicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  academicDepartmentController.createAcademicDepartment,
);
router.get(
  '/get-all-department',
  academicDepartmentController.getAlAcademicDepartment,
);
router.get(
  '/get-department/:id',
  academicDepartmentController.getSingleAcademicDepartment,
);
router.patch(
  '/update-department/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentController.updateAcademicDepartment,
);

export const academicDepartmentRoutes = router;
