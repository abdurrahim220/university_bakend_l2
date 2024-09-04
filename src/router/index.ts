import { Router } from 'express';
import { userRouter } from '../module/user/user.route';
import { studentRoute } from '../module/student/student.route';
import { AcademicSemesterRoutes } from '../module/academicSemester/academicSemester.route';

const router = Router();

const moduleRouters = [
  {
    path: '/users',
    router: userRouter,
  },
  {
    path: '/students',
    router: studentRoute,
  },
  {
    path: '/academic',
    router: AcademicSemesterRoutes,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.router));

export default router;
