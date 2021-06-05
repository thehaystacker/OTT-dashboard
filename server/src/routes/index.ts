import { Router } from "express";
import UserRoute from "./users.route";

const router = Router();

router.use(`/users`, UserRoute);

export default router;
