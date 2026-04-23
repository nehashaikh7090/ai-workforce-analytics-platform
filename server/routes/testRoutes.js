const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/protected", protect, (req, res) => {
  res.json({
    success: true,
    message: "You accessed a protected route 🔐",
    user: req.user,
  });
});


// Only admin can access
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({
    success: true,
    message: "Admin access granted 👑",
  });
});

// Admin + Manager
router.get("/manager", protect, authorizeRoles("admin", "manager"), (req, res) => {
  res.json({
    success: true,
    message: "Manager access granted 🧑‍💼",
  });
});

// All authenticated users
router.get("/employee", protect, (req, res) => {
  res.json({
    success: true,
    message: "Employee access granted 👷",
  });
});


module.exports = router;