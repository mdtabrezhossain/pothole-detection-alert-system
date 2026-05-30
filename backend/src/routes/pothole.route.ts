import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { createPothole, getNearbyPotholes, deletePothole, updatePothole, createVote } from "../controllers/pothole.controller.js";
import { verifyOwnership } from "../middlewares/ownership.middleware.js";


const router = Router();

router.route('/')
    .get(authenticateUser, getNearbyPotholes)
    .post(authenticateUser, createPothole);

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

router.route('/:id/vote')
    .post(authenticateUser, createVote);

export default router;