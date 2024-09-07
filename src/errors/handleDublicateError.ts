/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TErrorSource,
  TGenericErrorResponse,
} from '../interface/errorInterface';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extracted_value = match && match[1];

  const errorSources: TErrorSource[] = [
    {
      path: '',
      message: `${extracted_value} is already exists`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};

export default handleDuplicateError;
