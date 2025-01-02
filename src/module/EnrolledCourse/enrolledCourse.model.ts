import { Schema, model } from 'mongoose';
import { TEnrolledCourse, TCourseMarks } from './enrolledCourse.interface';
import { Grade } from './enrolledCourse.constant';

const courseMarksSchema = new Schema<TCourseMarks>(
  {
    classTest1: { type: Number, default: 0 },
    midTerm: { type: Number, default: 0 },
    classTest2: { type: Number, default: 0 },
    finalTerm: { type: Number, default: 0 },
  },
  { _id: false },
);

const enrolledCourseSchema = new Schema<TEnrolledCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    ref: 'SemesterRegistration',
    required: true,
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
    required: true,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
    required: true,
  },
  offeredCourse: {
    type: Schema.Types.ObjectId,
    ref: 'OfferedCourse',
    required: true,
  },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  faculty: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
  isEnrolled: { type: Boolean, default: false },
  courseMarks: { type: courseMarksSchema, default: {} },
  grade: { type: String, enum: Grade, default: 'NA' },
  gradePoint: { type: Number, default: 0, min: 0, max: 4 },
  isCompleted: { type: Boolean, default: false },
});

const EnrolledCourseModel = model<TEnrolledCourse>(
  'EnrolledCourse',
  enrolledCourseSchema,
);

export default EnrolledCourseModel;
