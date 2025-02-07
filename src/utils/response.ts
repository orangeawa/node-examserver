/**
 * 成功响应
 * @param data 数据
 * @param message 消息
 * @param code 代码
 * @param total 总数
 */
export const successResponse = (data: any, message: string = "success", code: number = 200, total: number = 0) => {
  return {
    code,
    message,
    data,
    total
  };
};

/**
 * 错误响应
 * @param message 错误信息
 * @param data 错误数据
 * @param code 错误代码
 * @returns 错误响应
 */
export const errorResponse = (message: string, data: any = null, code: number = 400) => {
  return {
    code,
    message,
    data,
  };
};

