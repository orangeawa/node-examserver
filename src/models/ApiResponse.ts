export interface ApiResponse<T> {
    code: number; // 状态码，例如 200 表示成功
    msg: string; // 描述信息，例如 "success" 或错误信息
    data?: T; // 泛型，用于存储不同的数据内容
  }
  