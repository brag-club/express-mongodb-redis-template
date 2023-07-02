import { Router } from "express";

import { loginUserInput } from "@/validations/auth.validations";
import validateResource from "@/validations/validate-resource";

import AuthController from "../controllers/auth.controller";

const { login } = new AuthController();
const router = Router();

router.post("/login", validateResource(loginUserInput), login);

export default router;
