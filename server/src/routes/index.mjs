import { Router } from "express";
import prouductsRouter from "./products.mjs";
import usersRouter from "./users.mjs";

const router = Router();

router.use(prouductsRouter);
router.use(usersRouter);

export default router;
