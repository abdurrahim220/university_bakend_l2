import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseService } from './enrolledCourse.services';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await EnrolledCourseService.createEnrolledCourseIntoDB(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Enrolled course created successfully',
    data: result,
  });
});

export const EnrolledCourseController = {
  createEnrolledCourse,
};
