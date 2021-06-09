import { Router, Request, Response } from "express";
import * as UserController from "../controller/user.controller";
import { auth } from "../middleware/auth";
import * as UserValidation from "../validations/user.validation";

const router = Router();

router.post(
	`/register`,
	UserValidation.validateRegister(),
	UserController.register
);

router.post(`/login`, UserValidation.validateLogin(), UserController.login);

router.post(`/logout`, auth, UserController.logout);

router.get(`/all`, auth, UserController.getAllUsers);

router.get(`/me`, auth, UserController.getUserProfile);

router.get(`/:id`, auth, UserController.getSingleUserProfile);

router.patch(`/:id`, auth, UserController.updateUser);

export default router;
