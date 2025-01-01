// import { UserService } from './user.services';
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';

import AcademicSemester from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import User from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../Faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../Faculty/faculty.model';
import { TAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
// import { verifyToken } from '../Auth/auth.utils';

const createStudentIntoDB = async (
  file: any,
  password: string,
  studentData: TStudent,
) => {
  //   create a user object
  // console.log(studentData)

  const userData: Partial<TUser> = {};

  // if password is not given , use default password
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';
  userData.email = studentData.email;

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError('Invalid academic semester', httpStatus.BAD_REQUEST);
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);

    const imageName = userData.id + '-' + studentData.name;
    // console.log(imageName)
    // send image to cloudinary

    const { secure_url } = await sendImageToCloudinary(imageName, file.path);

    //   create a user
    const newUser = await User.create([userData], {
      session,
    });

    //   create a student

    if (!newUser.length) {
      throw new AppError('Failed to create user', httpStatus.BAD_REQUEST);
    }
    // set id , _id as user
    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id; // reference _id
    studentData.profileImg = secure_url;

    const newStudent = await StudentModel.create([studentData], {
      session,
    });
    if (!newStudent.length) {
      throw new AppError('Failed to create student', httpStatus.BAD_REQUEST);
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createFaculty = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  const userData: Partial<TUser> = {};
  // console.log(payload);

  userData.password = password || (config.default_pass as string);
  userData.role = 'faculty';
  // set faculty email
  userData.email = payload.email;

  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError('Invalid academic department', httpStatus.BAD_REQUEST);
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateFacultyId();

    const imageName = userData.id + '-' + payload.name;
    // console.log(imageName)
    // send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, file.path);

    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError('Failed to create user', httpStatus.BAD_REQUEST);
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.profileImg = secure_url;

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError('Failed to create faculty', httpStatus.BAD_REQUEST);
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_pass as string);
  userData.role = 'admin';
  // set admin email
  userData.email = payload.email;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateAdminId();
    const imageName = userData.id + '-' + payload.name;

    const { secure_url } = await sendImageToCloudinary(imageName, file.path);

    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError('Failed to create admin', httpStatus.BAD_REQUEST);
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.profileImg = secure_url;
    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError('Failed to create admin', httpStatus.BAD_REQUEST);
    }
    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getMe = async (userId: string, role: string) => {
  // const decoded = verifyToken(token, config.jwt_access_secret as string);

  // const { userId, role } = decoded;

  // console.log(decoded);
  let result = null;
  if (role === 'student') {
    result = await StudentModel.findOne({ id: userId })
      .populate('admissionSemester')
      .populate('academicDepartment')
      .populate('user');
  }
  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId })
      .populate('academicDepartment')
      .populate('user'); // find faculty
  }
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user'); // find admin
  }

  return result;
};

const changeStatus = async (id: string, status: string) => {
  const result = await User.findByIdAndUpdate(id, { status }, { new: true });
  return result;
};

export const UserService = {
  createStudentIntoDB,
  createFaculty,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
