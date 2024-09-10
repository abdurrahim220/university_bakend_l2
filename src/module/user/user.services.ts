/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';

import AcademicSemester from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import User from './user.model';
import { generateFacultyId, generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../Faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../Faculty/faculty.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //   create a user object
  // console.log(studentData)

  const userData: Partial<TUser> = {};
  

  // if password is not given , use default password
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);

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

const createFaculty = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};
  console.log(payload)

  userData.password = password || (config.default_pass as string);
  userData.role = 'faculty';

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
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError('Failed to create user', httpStatus.BAD_REQUEST);
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

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

export const UserService = {
  createStudentIntoDB,
  createFaculty,
};
