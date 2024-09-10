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

export const facultyController = {
  getAllFaculty,
};
