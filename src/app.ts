import express, { Request, Response } from 'express';
import { studentRoute } from './module/student/student.route';
import { userRouter } from './module/user/user.route';

const app = express();

app.use(express.json());

// application routes
app.use('/api/v1/students', studentRoute);
app.use('/api/v1/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('University Server is Running!!');
});

export default app;
