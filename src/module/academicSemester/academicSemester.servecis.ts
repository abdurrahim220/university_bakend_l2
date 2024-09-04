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

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (academicId: string) => {
  const result = await AcademicSemester.findById({ _id: academicId });
  return result;
};

const updateSingleAcademicSemesterFromDB = async (
  academicId: string,
  updateData: Partial<TAcademicSemester>
) => {
  const result = await AcademicSemester.findByIdAndUpdate(
    academicId,
    updateData,
    { new: true } 
  );
  return result;
};


export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateSingleAcademicSemesterFromDB,
};
