import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { addPothole, getNearbyPotholes, removePothole, updatePothole } from "../controllers/pothole.controller.js";
import { verifyOwnership } from "../middlewares/ownership.middleware.js";


const router = Router();

router.route('/')
    .get(authenticateUser, getNearbyPotholes)
    .post(authenticateUser, addPothole);

router.route('/:id')
    .put(
        authenticateUser,
        verifyOwnership('potholes', 'uploaded_by'),
        updatePothole
    )
    .delete(
        authenticateUser,
        verifyOwnership('potholes', 'uploaded_by'),
        removePothole
    );

export default router;