require("dotenv").config();
import { Request, Response } from "express";
import { errorResponse, successResponse } from "../helpers/responseHandler";
import { validatePayload } from "../libs/yup";
import { InferType, object, string } from "yup";
import Nft from "../schemas/NFT";
import { RequestPayloadExtras } from "../global/types";

let nftSchema = object({
  name: string().required(),
  description: string().required(),
  wallet: string().required(),
  logoUrl: string().required(),
  nftId: string().required(),
});

export type NFTPayload = InferType<typeof nftSchema>;

export const createNFT = async (req: Request & RequestPayloadExtras, res: Response) => {
  try {
    const validation = await validatePayload<NFTPayload>(nftSchema, req.body);

    if (!validation.status) {
      return errorResponse(res, validation.error);
    }

    if(req.wallet !== req.body.wallet){
      return errorResponse(res, `Invalid user session`, 403);
    }

    const nftExists = await Nft.exists({ nftId: req.body.nftId });

    if(nftExists){
      return errorResponse(res, `An NFT with ID of '${req.body.nftId}' already exists`);
    }

    await Nft.create(req.body);

    successResponse(res, { nftId: req.body.nftId }, "NFT created successfully");
  } catch (error) {
    if (error instanceof Error) {
      errorResponse(res, error.message, 500);
    }
  }
};

export const getNFTGallery = async (
  req: Request & RequestPayloadExtras,
  res: Response
) => {
  try {
    const nfts = await Nft.find({ wallet: req.wallet });

    successResponse(res, nfts, "Data retrieved successfully.");
  } catch (error) {
    if (error instanceof Error) {
      errorResponse(res, error.message, 500);
    }
  }
};

export const getNFT = async (req: Request, res: Response) => {
  try {
    const nftId = req.params.id as string;

    if (!nftId) {
      return errorResponse(res, "Invalid NFT id", 400);
    }

    const nft = await Nft.findOne({ nftId });

    successResponse(res, nft, "Data retrieved successfully.");
  } catch (error) {
    if (error instanceof Error) {
      errorResponse(res, error.message, 500);
    }
  }
};