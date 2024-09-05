import { model, Schema } from 'mongoose';
import { TAcademic } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademic>(
  {
    name: {
      type: 'string',
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const academicFaculty = model<TAcademic>(
  'AcademicFaculty',
  academicFacultySchema,
);
