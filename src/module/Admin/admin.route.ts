import express from 'express';

import { AdminControllers } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.get('/all', AdminControllers.getAllAdmins);

router.get('/single/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/update/:id',
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/delete/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;
