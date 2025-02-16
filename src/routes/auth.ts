import { authenticateUser } from '../controllers/auth';

var router = require("express").Router();

router.post('/auth', authenticateUser)

export default router