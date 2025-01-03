/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import EnrolledCourseModel from './enrolledCourse.model';
import { StudentModel } from '../student/student.model';
import mongoose from 'mongoose';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { Course } from '../Course/course.model';
import { Faculty } from '../Faculty/faculty.model';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  /*
   * Step1: check if the offered course is exists
   * Step2: check if the student is already enrolled in the course
   * Step3: check if the maxCredit is exceeded
   * step4: create the enrolled course
   */

  const { offeredCourse } = payload;
  const isOfferedCourseExit = await OfferedCourse.findById(offeredCourse);

  if (!isOfferedCourseExit) {
    throw new AppError('Offered course not found', httpStatus.NOT_FOUND);
  }

  if (isOfferedCourseExit.maxCapacity <= 0) {
    throw new AppError('Course is full', httpStatus.BAD_REQUEST);
  }

  const student = await StudentModel.findOne({ id: userId }, { __id: 1 });

  if (!student) {
    throw new AppError('Student not found', httpStatus.NOT_FOUND);
  }
  const isEnrolledCourseExit = await EnrolledCourseModel.findOne({
    semesterRegistration: isOfferedCourseExit?.semesterRegistration,
    offeredCourse,
    student: student._id,
  });

  if (isEnrolledCourseExit) {
    throw new AppError(
      'Already enrolled in the course',
      httpStatus.BAD_REQUEST,
    );
  }

  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExit.semesterRegistration,
  ).select('maxCredit');

  const maxCredit = semesterRegistration?.maxCredit;

  // total enrolled credit + new enrolled course credit should be less than max credit
  const totalEnrolledCoures = await EnrolledCourseModel.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExit.semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    {
      $unwind: '$enrolledCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredit: { $sum: '$enrolledCourseData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredit: 1,
      },
    },
  ]);
  const course = await Course.findById(isOfferedCourseExit.course);
  const totalCredits =
    totalEnrolledCoures.length > 0
      ? totalEnrolledCoures[0].totalEnrolledCredit
      : 0;

  if (totalCredits && maxCredit && totalCredits + course?.credits > maxCredit) {
    throw new AppError('Max credit limit reached', httpStatus.BAD_REQUEST);
  }
  // console.log(totalCredits);

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await EnrolledCourseModel.create(
      [
        {
          semesterRegistration: isOfferedCourseExit.semesterRegistration,
          academicSemester: isOfferedCourseExit.academicSemester,
          academicFaculty: isOfferedCourseExit.academicFaculty,
          academicDepartment: isOfferedCourseExit.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExit.course,
          student: student._id,
          faculty: isOfferedCourseExit.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    );

    if (!result) {
      throw new AppError(
        'Failed to enroll this course',
        httpStatus.BAD_REQUEST,
      );
    }

    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: isOfferedCourseExit.maxCapacity - 1,
    });

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(err);
  }
};

const updateEnrolledCourseMarksIntoDB = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

  const faculty = await Faculty.findOne({ id: facultyId }, { _id: 1 });

  if (!faculty) {
    throw new AppError('Faculty not found', httpStatus.NOT_FOUND);
  }

  // console.log(faculty)

  const enrolledCourse = await EnrolledCourseModel.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: faculty._id,
  });

  if (!enrolledCourse) {
    throw new AppError('Enrolled course not found', httpStatus.NOT_FOUND);
  }

  

  if (enrolledCourse.faculty.toString() !== faculty._id.toString()) {
    throw new AppError('You are not allowed to update this course', httpStatus.FORBIDDEN);
  }

  const totalMarks = Object.values(courseMarks).reduce(
    (acc, curr) => acc + curr,
    0,
  );
  

  return result;
};

export const EnrolledCourseService = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB,
};
