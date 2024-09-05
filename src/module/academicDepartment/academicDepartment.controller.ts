import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicDepartmentServices } from './academicDepartment.servecis';


const createAcademicDepartment = catchAsync(async (req, res) => {

  

  const result = await academicDepartmentServices.createAcademicDepartmentIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  });
});

const getAlAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmentServices.getAlAcademicDepartmentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department list fetched successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmentServices.getSingleAcademicDepartmentFromDB(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department fetched successfully',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmentServices.updateAcademicDepartmentIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department updated successfully',
    data: result,
  });
});

export const academicDepartmentController = {
  createAcademicDepartment,
  getAlAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
