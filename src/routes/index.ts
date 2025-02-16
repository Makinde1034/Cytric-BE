import express from "express";
import nft from './nft'
import auth from './auth';
import mongodb from "../config";
import { verifyJWT } from "../libs/jwt";

let router = express();

mongodb(() => {
  router.use('/v1', auth);
  router.use('/v1/nft', verifyJWT, nft);
});

export default router