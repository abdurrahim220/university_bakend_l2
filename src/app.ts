/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import express, { Request, Response, NextFunction } from 'express';

import globalErrorHandler from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';
import router from './router';

const app = express();

app.use(express.json());

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('University Server is running!!');
});

// not found
app.use(notFound);

app.use(globalErrorHandler);

export default app;
