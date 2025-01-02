import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { OfferedCourseController } from './offeredCourse.controllers';

const router = express.Router();

router.post(
  '/create',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);
router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseController.updateOfferedCourse,
);
router.delete('/:id', OfferedCourseController.deleteOfferedCourse);
router.get('/:id', OfferedCourseController.getSingleOfferedCourse);
router.get('/', OfferedCourseController.getAllOfferedCourse);

export const offeredCourseRouter = router;
