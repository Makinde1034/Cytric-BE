import { Response } from "express";

type ApiResponse = {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

export const sendResponse = (res: Response, statusCode: number, payload: ApiResponse): void => {
  res.status(statusCode).json(payload);
};

export const successResponse = (res: Response, data: any, message = "Success", statusCode = 200): void => {
  sendResponse(res, statusCode, { success: true, message, data });
};

export const errorResponse = (res: Response, error: string, statusCode = 400): void => {
  sendResponse(res, statusCode, { success: false, error });
};
