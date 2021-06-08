import { Router } from "express";
import UsersRoute from "./user.route";

const router = Router();

router.use(`/user`, UsersRoute);

export default router;
