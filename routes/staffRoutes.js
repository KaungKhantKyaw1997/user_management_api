const express = require("express");
const {
  getStaff,
  getRoleByStaff,
  getPermissionByStaff,
} = require("../controllers/staffController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/staff", authMiddleware.authenticateToken, getStaff);
router.get(
  "/staff/:staffId/role",
  authMiddleware.authenticateToken,
  getRoleByStaff
);
router.get(
  "/staff/:staffId/permissions",
  authMiddleware.authenticateToken,
  getPermissionByStaff
);

module.exports = router;
