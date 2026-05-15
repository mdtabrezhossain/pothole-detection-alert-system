import { Router } from "express";
import { createUser, userLogin } from "../controllers/user.controller.js";
import { tryCatchWrapper } from "../utils/try-catch.util.js";


const router = Router();

router.route('/signup').post(tryCatchWrapper(createUser));
router.route('/login').post(tryCatchWrapper(userLogin));


export default router;