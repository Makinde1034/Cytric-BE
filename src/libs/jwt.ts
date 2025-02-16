import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../helpers/responseHandler";
import { RequestPayloadExtras } from "../global/types";

type Decoded = {
  wallet: string;
};

export const verifyJWT = (
  req: Request & RequestPayloadExtras,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (
    !authorization ||
    typeof authorization !== "string" ||
    !authorization.startsWith("Bearer ")
  ) {
    return errorResponse(res, "Invalid or Expired token.", 401);
  }

  const accessToken = authorization.split(" ")[1];
  const jwtSecret = process.env.JWT_SECRET as string;

  try {
    JWT.verify(accessToken, jwtSecret, (err, decoded: Decoded) => {
      if (err) {
        return errorResponse(res, "Invalid or Expired token.", 401);
      }
      req.wallet = decoded.wallet;
      next();
    });
  } catch (error) {
    return errorResponse(res, "Invalid or Expired token.", 401);
  }
};

export function generateJWT(wallet: string) {
  var jwtSecret = process.env.JWT_SECRET as string;
  const expiresIn = "1d";
  const token = JWT.sign({ wallet }, jwtSecret, { expiresIn });

  return token;
}
