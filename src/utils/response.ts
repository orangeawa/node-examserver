// src/utils/response.ts

import { ApiResponse } from '../models/ApiResponse';

export const successResponse = <T>(data: T, msg = 'success'): ApiResponse<T> => {
  return {
    code: 200,
    msg,
    data,
  };
};

export const errorResponse = (msg: string, code = 400): ApiResponse<null> => {
  return {
    code,
    msg,
  };
};
