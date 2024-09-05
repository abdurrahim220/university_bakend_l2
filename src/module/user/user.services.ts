import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import User from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //   create a user object

  const userData: Partial<TUser> = {};

  // if password is not given , use default password
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';
  

 


  // find academic semester info
const admissionSemester = await AcademicSemester.findById(studentData.admissionSemester)

  userData.id = await generateStudentId(admissionSemester);

  //   create a user

  const newUser = await User.create(userData);

  //   create a student

  if (Object.keys(newUser).length) {
    // set id , _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; // reference _id

    const newStudent = await StudentModel.create(studentData);

    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
