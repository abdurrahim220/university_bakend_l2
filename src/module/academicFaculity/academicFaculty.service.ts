import { TAcademic } from './academicFaculty.interface';
import { academicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademic) => {
  const result = await academicFaculty.create(payload);
  return result;
};

const getAlAcademicFacultyFromDB = async () => {
  const result = await academicFaculty.find();
  return result;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await academicFaculty.findById(id);
  return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademic>,
) => {
  const result = await academicFaculty.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const academicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAlAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
