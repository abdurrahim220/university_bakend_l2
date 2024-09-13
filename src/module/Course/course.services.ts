import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { Course, CourseFaculty } from './course.model';
import { TCourse, TCoursefaculty } from './course.interface';
import QueryBuilder from '../../build/QueryBuilder';
import { CourseSearchAbleFields } from './course.constants';
import AppError from '../../errors/AppError';


const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find(),
    // .populate('preRequisiteCourse.course'),
    query,
  )
    .search(CourseSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourse.course',
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourse, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //step1: basic course info update
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updatedBasicCourseInfo) {
      throw new AppError( 'Failed to update course',httpStatus.BAD_REQUEST);
    }

    // check if there is any pre requisite courses to update
    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
      // filter out the deleted fields
      const deletedPreRequisites = preRequisiteCourse
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedpreRequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourse: { course: { $in: deletedPreRequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedpreRequisiteCourse) {
        throw new AppError('Failed to update course',httpStatus.BAD_REQUEST);
      }

      // filter out the new course fields
      const newPreRequisites = preRequisiteCourse?.filter(
        (el) => el.course && !el.isDeleted,
      );

      const newpreRequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourse: { $each: newPreRequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newpreRequisiteCourse) {
        throw new AppError('Failed to update course',httpStatus.BAD_REQUEST);
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id).populate(
      'preRequisiteCourse.course',
    );

    return result;
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    await session.endSession();
    throw new AppError( 'Failed to update course',httpStatus.BAD_REQUEST);
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCoursefaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCoursefaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
};