import { Router } from 'express';
import { userRouter } from '../module/user/user.route';
import { studentRoute } from '../module/student/student.route';
import { AcademicSemesterRoutes } from '../module/academicSemester/academicSemester.route';
import { academicFacultyRoutes } from '../module/academicFaculity/academicFaculty.route';

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
    path: '/semester',
    router: AcademicSemesterRoutes,
  },
  {
    path: '/faculty',
    router: academicFacultyRoutes,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.router));

export default router;
