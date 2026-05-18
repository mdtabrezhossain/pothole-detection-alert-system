import { Router } from "express";
import { tryCatchWrapper } from "../utils/try-catch.util.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { addPothole } from "../controllers/pothole.controller.js";


const router = Router();

router.route('/').post(
    tryCatchWrapper(authenticateUser),
    tryCatchWrapper(addPothole)
);

export default router;