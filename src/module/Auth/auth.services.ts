import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TLoginUser } from './auth.interface';
import User from '../user/user.model';
import { createToken } from './auth.utils';
import { sendEmail } from '../../utils/sendEmail';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(payload.id);

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

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError('Password do not matched', httpStatus.FORBIDDEN);

  //create token and sent to the  client

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userData.userId);

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

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError('Password do not matched', httpStatus.FORBIDDEN);

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { userId, iat } = decoded;

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
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError('You are not authorized !', httpStatus.UNAUTHORIZED);
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

// const forgotPassword = async (id: string) => {
//   // checking if the user is exist
//   const user = await User.isUserExistsByCustomId(id);

//   if (!user) {
//     throw new AppError('This user is not found !', httpStatus.NOT_FOUND);
//   }
//   // checking if the user is already deleted
//   const isDeleted = user?.isDeleted;

//   if (isDeleted) {
//     throw new AppError('This user is deleted !', httpStatus.FORBIDDEN);
//   }

//   // checking if the user is blocked
//   const userStatus = user?.status;

//   if (userStatus === 'blocked') {
//     throw new AppError('This user is blocked ! !', httpStatus.FORBIDDEN);
//   }

//   //create token and sent to the  client

//   const jwtPayload = {
//     userId: user.id,
//     role: user.role,
//   };

//   const resetPasswordToken = createToken(
//     jwtPayload,
//     config.jwt_reset_secret as string,
//     config.jwt_reset_expires_in as string,
//   );

//   return {
//     resetPasswordToken,
//   };
// }

const forgotPassword = async (id: string) => {
  const user = await User.isUserExistsByCustomId(id);

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


  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m'
  );
 

  const resetUILink = `${config.reset_password_ui_link}?id=${id}&token=${resetToken}`;

  sendEmail(user.email, resetUILink);
  // console.log(user.email, resetUILink);
};


const resetPassword = async (id: string, newPassword: string, token: string | undefined) => {
 
  const user = await User.isUserExistsByCustomId(id);

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

  // checking if the token is valid

  const decoded = jwt.verify(token as string, config.jwt_access_secret as string) as JwtPayload;

  // console.log(decoded)
  if (decoded.userId !== user.id) {
    throw new AppError('You are not authorized !', httpStatus.UNAUTHORIZED);
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,

    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );


  
}


export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
};

