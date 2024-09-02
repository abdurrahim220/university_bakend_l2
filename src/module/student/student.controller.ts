import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentJoiValidationSchema from './student.joi.validation';
import studentZodValidationSchema from './student.zod.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    //? joi validation
    // const {error,value}=studentJoiValidationSchema.validate(studentData);

    // if(error){
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong!!',
    //     error: error.details,
    //   });
    // }

    // will call service function to send this data

    // const result = await StudentServices.createStudentIntoDB(value);

    // zod validation

    const zodParseData = studentZodValidationSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDB(zodParseData);

    // send response
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error : any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students fetched successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student fetched successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
