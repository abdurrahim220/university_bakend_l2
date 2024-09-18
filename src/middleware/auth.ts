import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';

import catchAsync from '../utils/catchAsync';
import User from '../module/user/user.model';
import { TUserRole } from '../module/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError('You are not authorized!', httpStatus.UNAUTHORIZED);
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    // checking if the user is exist
    const user = await User.isUserExistsByCustomId(userId);

    if (!user) {
      throw new AppError('This user is not found !', httpStatus.NOT_FOUND);
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError('This user is deleted !', httpStatus.FORBIDDEN);
    }

    // checking if the user is blocked
    const userStatus = user?.status;

    if (userStatus === 'blocked') {
      throw new AppError('This user is blocked ! !', httpStatus.FORBIDDEN);
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError('You are not authorized !', httpStatus.UNAUTHORIZED);
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        'You are not authorized  hi!',
        httpStatus.UNAUTHORIZED,
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
