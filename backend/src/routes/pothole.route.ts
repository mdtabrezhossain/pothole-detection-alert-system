import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import {
    createPothole,
    deletePothole,
    updatePothole,
    findNearbyPotholes,
    getRealTimeAlerts
} from "../controllers/pothole.controller.js";
import { verifyOwnership } from "../middlewares/ownership.middleware.js";


const router = Router();

router.route('/')
    .get(findNearbyPotholes)
    .post(authenticateUser, createPothole);

router.route('/alerts').get(getRealTimeAlerts);

router.route('/:id')
    .put(
        authenticateUser,
        updatePothole
    )
    .delete(
        authenticateUser,
        verifyOwnership('potholes', 'uploaded_by'),
        deletePothole
    );

export default router;