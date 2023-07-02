import { Router } from "express";

import AuthMiddleware from "@/middlewares/auth.middleware";
import { createUserInput } from "@/validations/auth.validations";
import validateResource from "@/validations/validate-resource";

import UserController from "../controllers/user.controller";

const { create, remove, get, getAll, update, me } = new UserController();
const { authenticate } = new AuthMiddleware();

const router = Router();

router.get("/", getAll);
router.get("/me", authenticate as any, me as any);
router.get("/:id", get);
router.post("/", validateResource(createUserInput), create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
