const { Op } = require("sequelize");
const Staff = require("../models/Staff");
const User = require("../models/User");
const UserRole = require("../models/UserRole");
const Role = require("../models/Role");
const RolePermission = require("../models/RolePermission");
const Permission = require("../models/Permission");

const getStaff = async (req, res) => {
  try {
    const { roleId, depId, email } = req.user;

    if (!roleId || !depId || !email) {
      return res.status(400).json({ message: "Invalid token data." });
    }

    const conditions = {
      email: {
        [Op.notIn]: [email, process.env.ADMIN_USER],
      },
    };

    if (roleId === 2) {
      conditions.depId = depId;
    } else if (roleId !== 1) {
      return res.status(200).json({
        message: "No access to staff data.",
        staff: [],
      });
    }

    const staffData = await Staff.findAll({
      where: conditions,
      attributes: [
        "staffId",
        "code",
        "name",
        "email",
        "mobile",
        "joinedDate",
        "position",
        "age",
        "gender",
        "status",
      ],
      order: [["code", "ASC"]],
    });

    if (staffData.length === 0) {
      return res.status(404).json({ message: "No staff data found." });
    }

    res.status(200).json({
      message: "Staff data retrieved successfully.",
      staff: staffData,
    });
  } catch (error) {
    console.error("Error retrieving staff data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getRoleByStaff = async (req, res) => {
  try {
    const { staffId } = req.params;

    const user = await User.findOne({ where: { staffId } });
    if (!user) {
      return res.status(404).json({ message: "Staff member not found." });
    }

    const userRole = await UserRole.findOne({
      where: { userId: user.userId },
    });
    if (!userRole) {
      return res
        .status(404)
        .json({ message: "No role assigned to this staff member." });
    }

    const role = await Role.findOne({ where: { roleId: userRole.roleId } });
    if (!role) {
      return res.status(404).json({ message: "Role not found." });
    }

    res.status(200).json({
      message: "Staff member's role retrieved successfully.",
      role: role.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "An error occurred while retrieving the staff member's role. Please try again later.",
    });
  }
};

const getPermissionByStaff = async (req, res) => {
  try {
    const { staffId } = req.params;

    const user = await User.findOne({ where: { staffId } });
    if (!user) {
      return res.status(404).json({ message: "Staff member not found." });
    }

    const userRole = await UserRole.findOne({
      where: { userId: user.userId },
    });
    if (!userRole) {
      return res
        .status(404)
        .json({ message: "No role assigned to this staff member." });
    }

    const rolePermissions = await RolePermission.findAll({
      where: { roleId: userRole.roleId },
    });
    if (!rolePermissions.length) {
      return res.status(404).json({
        message: "No permissions assigned to this staff member's role.",
      });
    }
    const permissionIds = rolePermissions.map((rp) => rp.permissionId);
    const permissions = await Permission.findAll({
      where: { permissionId: permissionIds },
    });
    const permissionNames = permissions.map((permission) => permission.name);

    res.status(200).json({
      message: "Permissions for staff member's role retrieved successfully.",
      permissions: permissionNames,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "An error occurred while retrieving permissions. Please try again later.",
    });
  }
};

module.exports = { getStaff, getRoleByStaff, getPermissionByStaff };
