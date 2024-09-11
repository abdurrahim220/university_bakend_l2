import { Router } from 'express';
import { userRouter } from '../module/user/user.route';
import { studentRoute } from '../module/student/student.route';
import { AcademicSemesterRoutes } from '../module/academicSemester/academicSemester.route';
import { academicFacultyRoutes } from '../module/academicFaculity/academicFaculty.route';
import { academicDepartmentRoutes } from '../module/academicDepartment/academicDepartment.route';
import { FacultyRouter } from '../module/Faculty/faculty.routes';
import { AdminRoutes } from '../module/Admin/admin.route';

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
    path: '/academicSemester',
    router: AcademicSemesterRoutes,
  },
  {
    path: '/academicFaculty',
    router: academicFacultyRoutes,
  },
  {
    path: '/academicDepartment',
    router: academicDepartmentRoutes,
  },
  {
    path: '/faculty',
    router: FacultyRouter,
  },
  {
    path: '/admin',
    router: AdminRoutes,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.router));

export default router;
