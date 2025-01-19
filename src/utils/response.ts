export const successResponse = (data: any, message: string = "success", code: number = 200, total: number = 0) => {
  return {
    code,
    message,
    data,
    total
  };
};

export const errorResponse = (message: string, data: any = null, code: number = 400) => {
  return {
    code,
    message,
    data,
  };
};

