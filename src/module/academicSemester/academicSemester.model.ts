import { Schema, model } from 'mongoose';
import { months, TAcademicSemester } from './academicSemester.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: ['Autumn', 'Summer', 'Fall'],
    },
    code: {
      type: String,
      required: true,
      enum: ['01', '02', '03'],
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: months,
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new AppError('Semester already exists', httpStatus.NOT_FOUND);
  }
  next();
});

// Create and export the Mongoose model
const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);

export default AcademicSemester;
