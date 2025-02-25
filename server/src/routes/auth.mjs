import { Router } from "express";

const router = Router();

router.get("/session", async (req, res) => {
  if (req.session && req.user) {
    return res.json({ isAuthenticated: true, user: req.session.user });
  } else {
    return res.json({ isAuthenticated: false });
  }
});

export default router;
