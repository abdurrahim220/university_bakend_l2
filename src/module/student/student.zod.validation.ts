import { z } from 'zod';

const userZodNameSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string(),
  lastName: z.string(),
});

const guardianZodSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianZodSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

export const createStudentZodValidationSchema = z.object({
  body: z.object({
    // password: z.string().max(20),
    student: z.object({
      name: userZodNameSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().date().optional(),
      email: z.string().email(),
      contactNo: z.string().min(1),
      emergencyContactNo: z.string().min(1),
      bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string().min(1),
      permanentAddres: z.string().min(1),
      guardian: guardianZodSchema,
      localGuardian: localGuardianZodSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});

const updateUserZodNameSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    })
    .optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updatedGuardianZodSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updatedLocalGuardianZodSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updatedCreateStudentZodValidationSchema = z.object({
  body: z.object({
    // password: z.string().max(20),
    student: z.object({
      name: updateUserZodNameSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().date().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().min(1).optional(),
      emergencyContactNo: z.string().min(1).optional(),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1).optional(),
      permanentAddres: z.string().min(1).optional(),
      guardian: updatedGuardianZodSchema,
      localGuardian: updatedLocalGuardianZodSchema,
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const studentZodValidation = {
  createStudentZodValidationSchema,
  updatedCreateStudentZodValidationSchema,
};
