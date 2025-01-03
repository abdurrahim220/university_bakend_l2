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

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {

  // console.log(req.user)
  const facultyId = req.user.userId;

  // console.log(facultyId)

  const result = await EnrolledCourseService.updateEnrolledCourseMarksIntoDB(facultyId,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled course marks updated successfully',
    data: result,
  });
})

export const EnrolledCourseController = {
  createEnrolledCourse,updateEnrolledCourseMarks
};
