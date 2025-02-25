import { Router } from "express";
import prouductsRouter from "./products.mjs";
import usersRouter from "./users.mjs";
import sessionRouter from "./auth.mjs";

const router = Router();

router.use(prouductsRouter);
router.use(usersRouter);
router.use(sessionRouter);

export default router;
