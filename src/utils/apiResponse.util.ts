import { NextApiRequest, NextApiResponse } from "next";
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const successResponse = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});

export const errorResponse = (message: string): ApiResponse<null> => ({
  success: false,
  error: message,
});

export const setCorsHeaders = (req: NextApiRequest, res: NextApiResponse,) => { 
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

 
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
}

