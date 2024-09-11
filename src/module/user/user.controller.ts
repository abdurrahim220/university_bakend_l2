/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { UserService } from './user.services';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;

  // console.log(studentData)
  const result = await UserService.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res, next) => {
  const { password, faculty: facultyData } = req.body;
  // console.log(facultyData)

  const result = await UserService.createFaculty(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty created successfully',
    data: result,
  });
});
const createAdmin = catchAsync(async (req, res, next) => {
  const { password, admin: adminData } = req.body;
  // console.log(facultyData)

  const result = await UserService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});


export const UserController = {
  createStudent,
  createFaculty,
  createAdmin
};
