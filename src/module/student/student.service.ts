/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import AppError from '../../errors/AppError';
import User from '../user/user.model';
import httpStatus from 'http-status';
import { TStudent } from './student.interface';
import QueryBuilder from '../../build/QueryBuilder';
import { studentSearchAbleFields } from './student.constants';

// const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
//   // {email:{$regex:query.searchTerm,$options:i}}
//   // {parentAddress:{$regex:query.searchTerm,$options:i}}
//   // {'name.firstName':{$regex:query.searchTerm,$options:i}}

//   const queryObj = { ...query }; //copy
//   const studentSearchAbleFields = ['email', 'name.firstName', 'presentAddress'];

//   let searchTerm = '';

//   if (query?.searchTerm) {
//     searchTerm = query?.searchTerm as string;
//   }

//   const searchQuery = StudentModel.find({
//     $or: studentSearchAbleFields.map((field) => ({
//       [field]: { $regex: searchTerm, $options: 'i' },
//     })),
//   });

//   // filtering

//   const excludeFields = ['searchTerm', 'sort', 'page', 'limit', 'fields'];

//   excludeFields.forEach((el) => delete queryObj[el]);

//   const filterQuery = searchQuery
//     .find(queryObj)
//     .populate('admissionSemester')
//     .populate({
//       path: 'academicDepartment',
//       populate: {
//         path: 'academicFaculty',
//       },
//     });

//   let sort = '-createdAt';
//   if (query?.sort) {
//     sort = query.sort as string;
//   }
//   const sortedQuery = filterQuery.sort(sort);
//   let page = 1;
//   let limit = 1;
//   let skip = 0;
//   if (query?.limit) {
//     limit = Number(query.limit);
//   }
//   if (query.page) {
//     page = Number(query.page);
//     skip = (page - 1) * limit;
//   }

//   const paginatedQuery = sortedQuery.skip(skip);

//   const LimitQuery = paginatedQuery.limit(limit);

//   // fields limiting
//   let fields = '-_v';
//   if (query?.fields) {
//     fields = (query.fields as string).split(',').join(' ');
//   }
//   const fieldsQuery = await LimitQuery.select(fields);
//   return fieldsQuery;
// };

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    StudentModel.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  // const result = await StudentModel.aggregate([
  //   {
  //     $match: { id: id },
  //   },
  // ]);
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );
    if (!deletedStudent) {
      throw new AppError('Failed to delete student', httpStatus.BAD_REQUEST);
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      },
    );
    if (!deletedUser) {
      throw new AppError('Failed to delete user', httpStatus.BAD_REQUEST);
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /**
   * guardian:{
   * fatherOccupation:"Teacher",
   * }
   *
   * guardian.fatherOccupation=Teacher;
   *
   */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const student = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return student;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
