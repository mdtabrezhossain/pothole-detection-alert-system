import { Router } from "express";
import {
    createUser,
    deleteUser,
    updateUser,
    userLogin
} from "../controllers/user.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { verifyOwnership } from "../middlewares/ownership.middleware.js";


const router = Router();

router.route('/signup').post(createUser);
router.route('/login').post(userLogin);

router.route('/:id')
    .put(
        authenticateUser,
        verifyOwnership('users', 'id'),
        updateUser
    )
    .delete(
        authenticateUser,
        verifyOwnership('users', 'id'),
        deleteUser
    );

export default router;