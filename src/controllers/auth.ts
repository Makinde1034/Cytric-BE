require("dotenv").config();
import { Request, Response } from "express";
import { errorResponse, successResponse } from "../helpers/responseHandler";
import { ethers } from "ethers";
import { generateJWT } from "../libs/jwt";
import User from '../schemas/User'

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const { wallet } = req.body;

    if (!ethers.isAddress(wallet)) {
      return errorResponse(res, "Invalid ETH address, please try again.", 400);
    }

    const accessToken = generateJWT(wallet);

    await User.findOneAndUpdate(
      { wallet },
      { wallet },
      { upsert: true, new: true }
    );
    
    successResponse(res, { accessToken }, "success", 200);
  } catch (error) {
    if (error instanceof Error) {
      errorResponse(res, error.message, 500);
    }
  }
};
