import { Request, Response } from 'express';
import { UserService } from './user.services';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;

    //   const zodParseData = studentZodValidationSchema.parse(studentData);

    const result = await UserService.createStudentIntoDB(password, studentData);

    // send response
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const UserController ={
  createStudent
}
