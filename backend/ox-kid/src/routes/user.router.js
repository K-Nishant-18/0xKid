import { Router } from "express";
import { verifyJWT } from "../middelweres/auth.middelwere.js";
import { getCurrentUser, getUser, getUserConcepts, updatePreferences } from "../controllers/user.controller.js";
import { forgetPassword } from "../controllers/forgotPassword.js";
import { verfiyOtp } from "../controllers/verifyOtp.js";

const router = Router();

router.route("/forgetPassword").post(forgetPassword);
router.route("/otp-verify").post(verfiyOtp);

router.route("/me").get(verifyJWT,getCurrentUser);
router.route("/preferences").put(verifyJWT,updatePreferences);
router.route("/:id").get(verifyJWT,getUser);
// router.route("/projects").get(verifyJWT,getUserProjects)
router.route("/my-concepts").get(verifyJWT,getUserConcepts)

export default router;