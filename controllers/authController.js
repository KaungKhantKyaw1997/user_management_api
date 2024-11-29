const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserRole = require("../models/UserRole");
const Role = require("../models/Role");
const RolePermission = require("../models/RolePermission");
const Permission = require("../models/Permission");
const Staff = require("../models/Staff");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({
      where: { email },
      include: { model: Staff, as: "staffInfo", required: false },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const userRole = await UserRole.findOne({ where: { userId: user.userId } });
    if (!userRole) {
      return res
        .status(401)
        .json({ message: "User does not have a valid role" });
    }

    const role = await Role.findOne({ where: { roleId: userRole.roleId } });
    if (!role) {
      return res.status(401).json({ message: "Role not found" });
    }

    const rolePermissions = await RolePermission.findAll({
      where: { roleId: role.roleId },
    });
    if (!rolePermissions.length) {
      return res
        .status(401)
        .json({ message: "No permissions found for this role" });
    }

    const permissionIds = rolePermissions.map((rp) => rp.permissionId);
    const permissions = await Permission.findAll({
      where: { permissionId: permissionIds },
    });
    if (!permissions.length) {
      return res.status(401).json({ message: "Invalid permissions" });
    }
    const permissionNames = permissions.map((permission) => permission.name);

    const token = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
        roleId: userRole.roleId,
        depId: user.staffInfo.depId,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRES_IN }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: role.name,
      permissions: permissionNames,
      user: {
        code: user.staffInfo.code,
        name: user.staffInfo.name,
        email: user.staffInfo.email,
        mobile: user.staffInfo.mobile,
        joinedDate: user.staffInfo.joinedDate,
        position: user.staffInfo.position,
        age: user.staffInfo.age,
        gender: user.staffInfo.gender,
        status: user.staffInfo.status,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login };
