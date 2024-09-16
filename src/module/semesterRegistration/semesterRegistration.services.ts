import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import { RegistrationStatus } from './semesterRegistration.constant';
import QueryBuilder from '../../build/QueryBuilder';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  /**
   * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
   * Step2: Check if the semester is exist
   * Step3: Check if the semester is already registered!
   * Step4: Create the semester registration
   */

  const academicSemester = payload?.academicSemester;

  //check if there any registered semester that is already 'UPCOMING'|'ONGOING'
  const isThereAnyUpcomingOrOngoingSEmester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSEmester) {
    throw new AppError(
      `There is already an ${isThereAnyUpcomingOrOngoingSEmester.status} registered semester !`,
      httpStatus.BAD_REQUEST,
    );
  }
  // check if the semester is exist
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(
      'This academic semester not found !',
      httpStatus.NOT_FOUND,
    );
  }

  // check if the semester is already registered!
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      'This semester is already registered!',
      httpStatus.CONFLICT,
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const geSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSingleSemesterRegistrationIntoDB = async (id:string) => {
  const result = await SemesterRegistration.findByIdAndUpdate(id);
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  geSingleSemesterRegistrationFromDB,
  updateSingleSemesterRegistrationIntoDB,
};
