import { Router } from "express";
import UserRoute from "./paths/user.route";

const router = Router();

router.use(`/user`, UserRoute);

export default router;
