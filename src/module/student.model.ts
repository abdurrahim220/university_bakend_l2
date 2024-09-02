import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  // StudentMethods,
  StudentModels,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student/student.interface';

import bcrypt from 'bcrypt';
import config from '../config';

const userNameSchema = new Schema<TUserName>({
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

const guardianSchema = new Schema<TGuardian>({
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

const localGuradianSchema = new Schema<TLocalGuardian>({
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

const studentSchema = new Schema<TStudent, StudentModels>(
  {
    id: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: [true, 'Password is required'],
      maxlength: [20, 'Password can not be more than 20 character'],
    },
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
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: '{VALUE} is not valid email',
      },
    },
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
  },
);

// ! virtual

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName}  ${this.name.middleName}  ${this.name.lastName}`;
});

//! pre save middleware /hook : will work on create() save()

studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save the data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // ? hashing password and save into db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware / hook
studentSchema.post('save', function (doc, next) {
  doc.password = '';

  // console.log(this, 'post hook : we saved our data');
  next();
});

// ? Query Middleware

studentSchema.pre('find', function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } });
  next();
});

//
studentSchema.pre('aggregate', function (next) {
  // console.log(this);
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

//? creating custom instance
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await StudentModel.findOne({ id });
//   return existingUser;
// };

// ? creating a custom static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id });
  return existingUser;
};

export const StudentModel = model<TStudent, StudentModels>(
  'Student',
  studentSchema,
);
