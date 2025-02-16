import { createNFT, getNFTGallery, getNFT } from '../controllers/nft';

var router = require("express").Router();

router.post('/create', createNFT);
router.get('/gallery', getNFTGallery);
router.get('/gallery/:id', getNFT);

export default router