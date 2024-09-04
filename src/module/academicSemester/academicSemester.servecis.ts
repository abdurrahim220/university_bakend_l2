import { TAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

type TAcademicSemesterCodeMapper = {
  [key: string]: string;
};

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // semester name --> semester code

  const academicSemesterNameCodeMapper: TAcademicSemesterCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error(
      `Academic semester name and code do not match. Name: ${
        payload.name
      }, Code: ${payload.code}`,
    );
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
