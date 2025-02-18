import { Router } from "express";
import prouductsRouter from "./products.mjs";

const router = Router();

router.use(prouductsRouter);

export default router;
