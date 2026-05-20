import { Router } from "express";
import { tryCatchWrapper } from "../utils/try-catch.util.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { addPothole, getNearbyPotholes } from "../controllers/pothole.controller.js";


const router = Router();

router.route('/').post(
    tryCatchWrapper(authenticateUser),
    tryCatchWrapper(addPothole)
);

router.route('/nearby').get(
    tryCatchWrapper(authenticateUser),
    tryCatchWrapper(getNearbyPotholes)
);

export default router;