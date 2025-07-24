import { PASSWORD,USERNAME } from "@/constants/user.constants";
import { setCorsHeaders } from "@/utils/apiResponse.util";
import { NextApiRequest, NextApiResponse } from "next";
 
import { createJWT } from "@/utils/auth";

type LoginResponse = {
  success: boolean;
  data?: {
    token: string | null;
  };
  error?: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
 
 setCorsHeaders(req, res);

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  const { username, password } = req.body;

  if (username !== USERNAME || password !== PASSWORD) {
    return res.status(401).json({
      success: false,
      error: "Invalid credentials",
    });
  }

          
  const token =  await createJWT(username, password)
     
  res.setHeader("Set-Cookie", `token=${token}; Path=/; domain=mayhem.local; Max-Age=2h`);
 
 
  return res.status(200).json({
    success: true,
    data: {
      token: token,
    },
  });
}
