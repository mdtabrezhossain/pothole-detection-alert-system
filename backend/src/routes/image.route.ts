import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { getImageKitToken, getImageVerification, getImages } from "../controllers/image.controller.js";

const router = Router();

router.route('/upload')
    // .get(authenticateUser, getImageKitToken);
    .get(getImageKitToken);

router.route('/verify')
    // .post(authenticateUser,getImageVerification);
    .post(getImageVerification);

router.route('/:potholeId')
    // .post(authenticateUser,getImageVerification);
    .get(getImages);

export default router;
