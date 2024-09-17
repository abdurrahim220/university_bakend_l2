import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { offeredCourseServices } from './offeredCourse.services';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseServices.createOfferedCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course created successfully',
    data: result,
  });
});


const getAllOfferedCourse = catchAsync(async (req, res) => {
//   const result
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course retrieved successfully',
    data: result,
  });
});
const getSingleOfferedCourse = catchAsync(async (req, res) => {
//   const result
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Offered course retrieved successfully',
    data: result,
  });
});
const updateOfferedCourse = catchAsync(async (req, res) => {
const {id} = req.params;
    const result = await offeredCourseServices.updateOfferedCourse(id,req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course updated successfully',
    data: result,
  });
});

export const OfferedCourseController = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
};
