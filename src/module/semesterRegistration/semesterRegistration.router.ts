import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);
router.get(
  '/',

  SemesterRegistrationControllers.getAllSemesterRegistrations,
);
router.get(
  '/:id',

  SemesterRegistrationControllers.geSingleSemesterRegistrations,
);

router.patch('/:id',validateRequest(SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema),SemesterRegistrationControllers.updateSemesterRegistration)

export const semesterRegistrationRouters = router;
