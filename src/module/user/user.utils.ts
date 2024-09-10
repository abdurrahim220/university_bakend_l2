import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import User from './user.model';

const findLastStudentId = async () => {
  const lastStudents = await User.findOne(
    { role: 'student' },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudents?.id ? lastStudents.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();
  const lastId = await findLastStudentId();

  const lastStudentSemesterCode = lastId?.substring(4, 6);
  const lastStudentYear = lastId?.substring(0, 4);
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;
  if (
    lastId &&
    lastStudentSemesterCode == currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    { role: 'faculty' },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `F${incrementId}`;
  return incrementId;
};
