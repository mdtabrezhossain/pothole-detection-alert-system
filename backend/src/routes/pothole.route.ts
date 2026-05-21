import { Router } from "express";
import { tryCatchWrapper } from "../utils/try-catch.util.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { addPothole, getNearbyPotholes, removePothole, updatePothole } from "../controllers/pothole.controller.js";


const router = Router();

router.route('/')
    .get(
        tryCatchWrapper(authenticateUser),
        tryCatchWrapper(getNearbyPotholes)
    )
    .post(
        tryCatchWrapper(authenticateUser),
        tryCatchWrapper(addPothole)
    );

router.route('/:id')
    .put(
        tryCatchWrapper(authenticateUser),
        tryCatchWrapper(updatePothole)
    )
    .delete(
        tryCatchWrapper(authenticateUser),
        tryCatchWrapper(removePothole)
    );

export default router;