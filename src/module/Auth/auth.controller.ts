import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.services';

const loginUser = catchAsync(async (req, res) => {
  const login = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: login,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const user = req.user;
  const { ...passwordData } = req.body;
  const login = await AuthServices.changePassword(user, passwordData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: login,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  const { id } = req.body;
  const result = await AuthServices.forgotPassword(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset link generated successfully!',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const { id, newPassword } = req.body;
  const token = req.headers.authorization;
  const result = await AuthServices.resetPassword(id, newPassword, token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully!',
    data: result,
  });
})

export const AuthController = {
  loginUser,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
};
