import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { facultyServices } from './faculty.services';

const getAllFaculty = catchAsync(async (req, res) => {
  const result = await facultyServices.getAllFacultiesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty fetched successfully',
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyServices.getSingleFaculty(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Faculty fetched successfully',
    data: result,
  });
});
const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyServices.updateFaculty(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  });
});

const deleteFacultyFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyServices.deleteFacultyFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully',
    data: result,
  });
});

export const facultyController = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFacultyFromDB,
};
