import { Router } from "express";
import { logOutUser, registerUser, UserLogIn } from "../controllers/user.controller.js";
import { verifyJWT } from "../middelweres/auth.middelwere.js";

const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(UserLogIn);

//secure
router.route("/logout").post(verifyJWT,logOutUser)

export default router;