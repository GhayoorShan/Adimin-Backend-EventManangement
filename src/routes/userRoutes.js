import { Router } from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const router = Router();

// Admin routes
router.post("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Admin Dashboard" });
});

// Manager routes
router.post(
  "/manager",
  verifyToken,
  authorizeRoles("admin", "manager"),
  (req, res) => {
    res.json({ message: "Manager Dashboard" });
  }
);

// Editor routes
router.post(
  "/editor",
  verifyToken,
  authorizeRoles("admin", "manager", "editor"),
  (req, res) => {
    res.json({ message: "Editor Dashboard" });
  }
);

export default router;
