import { Router, Request, Response } from "express";
import UserController from "../controller/users.controller";

const router = Router();

router.get(`/`, UserController.getAllUsers);
router.post(`/`, UserController.createUser);
router.patch(`/:id`, UserController.updateUser);

export default router;
