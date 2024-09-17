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
  '/update/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseController.updateOfferedCourse,
);
router.delete('/delete/:id', OfferedCourseController.deleteOfferedCourse);
router.get('/single/:id', OfferedCourseController.getSingleOfferedCourse);
router.get('/all', OfferedCourseController.getAllOfferedCourse);

export const offeredCourseRouter = router;
