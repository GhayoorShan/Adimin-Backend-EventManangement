const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const router = express.Router();

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

module.exports = router;
