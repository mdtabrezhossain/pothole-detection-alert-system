import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { getImageKitToken, getImageVerification } from "../controllers/image.controller.js";

const router = Router();

router.route('/upload')
    // .get(authenticateUser, getImageKitToken);
    .get(getImageKitToken);

router.route('/verify')
    // .post(authenticateUser,getImageVerification);
    .post(getImageVerification);

export default router;
