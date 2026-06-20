import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { createVote } from "../controllers/vote.controller.js";

const router = Router();

router.route('/:potholeId')
    .post(authenticateUser, createVote);

export default router;
