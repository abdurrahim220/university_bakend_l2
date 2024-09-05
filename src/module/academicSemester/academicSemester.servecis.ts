import { academicSemesterNameCodeMapper } from './academicConstant';
import { TAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // semester name --> semester code

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
  updateData: Partial<TAcademicSemester>,
) => {
  if (
    updateData.name &&
    updateData.code &&
    academicSemesterNameCodeMapper[updateData.name] !== updateData.code
  ) {
    throw new Error(
      `Academic semester name and code do not match. Name: ${
        updateData.name
      }, Code: ${updateData.code}`,
    );
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: academicId },
    updateData,
    { new: true },
  );
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateSingleAcademicSemesterFromDB,
};
