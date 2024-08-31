import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [
      true,
      'First name is required. Please provide a valid first name.',
    ],
    trim: true,
    maxlength: [20, 'First Name can not be more than 20 characters'],
    validate: {
      validator: function (value) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    // trim: true,
    required: [
      true,
      'Last name is required. Please provide a valid last name.',
    ],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not a valid last name',
    },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [
      true,
      "Father's name is required. Please provide the father's full name.",
    ],
  },
  fatherOccupation: {
    type: String,
    required: [
      true,
      "Father's occupation is required. Please provide the father's occupation.",
    ],
  },
  fatherContactNo: {
    type: String,
    required: [
      true,
      "Father's contact number is required. Please provide a valid contact number for the father.",
    ],
  },
  motherName: {
    type: String,
    required: [
      true,
      "Mother's name is required. Please provide the mother's full name.",
    ],
  },
  motherOccupation: {
    type: String,
    required: [
      true,
      "Mother's occupation is required. Please provide the mother's occupation.",
    ],
  },
  motherContactNo: {
    type: String,
    required: [
      true,
      "Mother's contact number is required. Please provide a valid contact number for the mother.",
    ],
  },
});

const localGuradianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [
      true,
      "Local guardian's name is required. Please provide the local guardian's full name.",
    ],
  },
  occupation: {
    type: String,
    required: [
      true,
      "Local guardian's occupation is required. Please provide the local guardian's occupation.",
    ],
  },
  contactNo: {
    type: String,
    required: [
      true,
      "Local guardian's contact number is required. Please provide a valid contact number for the local guardian.",
    ],
  },
  address: {
    type: String,
    required: [
      true,
      "Local guardian's address is required. Please provide the local guardian's address.",
    ],
  },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      // message:
      //   "The gender field can only be one of the following : 'male', 'female' or 'other' .",
      message: '{VALUE} is not valid gender',
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: { type: String, required: true, unique: true ,validate:{
    validator:(value)=>validator.isEmail(value),
    message: '{VALUE} is not valid email',
  }},
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloogGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddres: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuradianSchema,
    required: true,
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
