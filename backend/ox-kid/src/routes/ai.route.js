import { Router } from "express";
import { verifyJWT } from "../middelweres/auth.middelwere.js";
import { explainConcept, reviewCode, suggestProjectIdeas } from "../controllers/gemini.controller.js";

const router =Router();

router.route("/explain").post(verifyJWT,explainConcept);
router.route("/review").post(verifyJWT,reviewCode);
router.route("/project-idea").post(verifyJWT,suggestProjectIdeas)

export default router;