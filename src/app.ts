/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import express, { Request, Response, NextFunction } from 'express';
import globalErrorHandler from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';
import router from './router';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5000'],
  }),
);

// application routes
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  // Promise.reject();
};

app.get('/', (req: Request, res: Response) => {
  res.send('University Server is running!!');
});

// not found
app.use(notFound);
app.use(globalErrorHandler);

export default app;
