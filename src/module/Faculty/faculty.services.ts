import QueryBuilder from '../../build/QueryBuilder';
import { FacultySearchableFields } from './faculty.constant';
import { Faculty } from './faculty.model';


const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

export const facultyServices = {
  getAllFacultiesFromDB,
  
};
