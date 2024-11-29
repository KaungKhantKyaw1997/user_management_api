const { sequelize } = require("./models");
const User = require("./models/User");
const Role = require("./models/Role");
const Permission = require("./models/Permission");
const UserRole = require("./models/UserRole");
const RolePermission = require("./models/RolePermission");
const Staff = require("./models/Staff");
const Department = require("./models/Department");

async function initDatabase() {
  try {
    await sequelize.sync({ force: true });

    // Insert default roles if they don't exist
    const [superAdminRole] = await Role.findOrCreate({
      where: { name: "Super Admin" },
      defaults: { name: "Super Admin", label: "Administrator" },
    });
    const [managerRole] = await Role.findOrCreate({
      where: { name: "Manager" },
      defaults: { name: "Manager", label: "Manager User" },
    });
    const [standardRole] = await Role.findOrCreate({
      where: { name: "Standard" },
      defaults: { name: "Standard", label: "Standard User" },
    });

    // Insert default permissions if they don't exist
    const [viewPermission] = await Permission.findOrCreate({
      where: { name: "View User" },
      defaults: { name: "View User", label: "Can View User Info" },
    });
    const [managePermission] = await Permission.findOrCreate({
      where: { name: "Manage Staff" },
      defaults: { name: "Manage Staff", label: "Can Manage Staff" },
    });
    const [viewAllStaffPermission] = await Permission.findOrCreate({
      where: { name: "View All Staff" },
      defaults: { name: "View All Staff", label: "Can View All Staff Info" },
    });

    // Insert default departments if they don't exist
    const [techDept] = await Department.findOrCreate({
      where: { name: "Technology" },
      defaults: { name: "Technology", label: "Technology Department" },
    });
    const [hrDept] = await Department.findOrCreate({
      where: { name: "Human Resources" },
      defaults: {
        name: "Human Resources",
        label: "Human Resources Department",
      },
    });

    // Insert super admin staff with simplified data
    const [superAdminStaff] = await Staff.findOrCreate({
      where: { code: "S000" },
      defaults: {
        code: "S000",
        name: "Super Admin",
        depId: techDept.depId,
        email: "superadmin@gmail.com",
        mobile: "555-555-5555",
        position: "System Administrator",
        age: 45,
        gender: "Male",
        status: "Single",
        createdBy: "admin",
        updatedBy: "admin",
      },
    });

    // Insert staff with updated positions
    const [staff1] = await Staff.findOrCreate({
      where: { code: "S001" },
      defaults: {
        code: "S001",
        name: "John Doe",
        depId: techDept.depId,
        email: "john.doe@gmail.com",
        mobile: "123-456-7890",
        position: "Tech Manager",
        age: 30,
        gender: "Male",
        status: "Single",
        createdBy: "admin",
        updatedBy: "admin",
      },
    });
    const [staff2] = await Staff.findOrCreate({
      where: { code: "S002" },
      defaults: {
        code: "S002",
        name: "Jane Smith",
        depId: hrDept.depId,
        email: "jane.smith@gmail.com",
        mobile: "098-765-4321",
        position: "HR Manager",
        age: 28,
        gender: "Female",
        status: "Married",
        createdBy: "admin",
        updatedBy: "admin",
      },
    });
    const [staff3] = await Staff.findOrCreate({
      where: { code: "S003" },
      defaults: {
        code: "S003",
        name: "Alice Brown",
        depId: techDept.depId,
        email: "alice.brown@gmail.com",
        mobile: "123-555-7890",
        position: "Software Developer",
        age: 25,
        gender: "Female",
        status: "Single",
        createdBy: "admin",
        updatedBy: "admin",
      },
    });
    const [staff4] = await Staff.findOrCreate({
      where: { code: "S004" },
      defaults: {
        code: "S004",
        name: "Bob Johnson",
        depId: hrDept.depId,
        email: "bob.johnson@gmail.com",
        mobile: "987-654-3210",
        position: "HR Assistant",
        age: 30,
        gender: "Male",
        status: "Married",
        createdBy: "admin",
        updatedBy: "admin",
      },
    });
    const [staff5] = await Staff.findOrCreate({
      where: { code: "S005" },
      defaults: {
        code: "S005",
        name: "Eve White",
        depId: techDept.depId,
        email: "eve.white@gmail.com",
        mobile: "555-555-5555",
        position: "Software Engineer",
        age: 26,
        gender: "Female",
        status: "Single",
        createdBy: "admin",
        updatedBy: "admin",
      },
    });

    const [staff6] = await Staff.findOrCreate({
      where: { code: "S006" },
      defaults: {
        code: "S006",
        name: "James Black",
        depId: hrDept.depId,
        email: "james.black@gmail.com",
        mobile: "444-444-4444",
        position: "HR Specialist",
        age: 32,
        gender: "Male",
        status: "Married",
        createdBy: "admin",
        updatedBy: "admin",
      },
    });

    // Insert users with simplified data and staff associations
    const [superAdminUser] = await User.findOrCreate({
      where: { email: "superadmin@gmail.com" },
      defaults: {
        name: "Super Admin",
        email: "superadmin@gmail.com",
        password:
          "$2a$10$tapCxRRJUD8poKBdkn0mUe2oLy5QbGuu/yIoE2RL.aHztyG.O6jha",
        staffId: superAdminStaff.staffId,
        createdBy: "admin",
        updatedBy: "admin",
      },
    });
    const [user1] = await User.findOrCreate({
      where: { email: "john.doe@gmail.com" },
      defaults: {
        name: "John Doe",
        email: "john.doe@gmail.com",
        password:
          "$2a$10$tapCxRRJUD8poKBdkn0mUe2oLy5QbGuu/yIoE2RL.aHztyG.O6jha",
        staffId: staff1.staffId,
        createdBy: "admin",
        updatedBy: "admin",
      },
    });
    const [user2] = await User.findOrCreate({
      where: { email: "jane.smith@gmail.com" },
      defaults: {
        name: "Jane Smith",
        email: "jane.smith@gmail.com",
        password:
          "$2a$10$tapCxRRJUD8poKBdkn0mUe2oLy5QbGuu/yIoE2RL.aHztyG.O6jha",
        staffId: staff2.staffId,
        createdBy: "admin",
        updatedBy: "admin",
      },
    });
    const [user3] = await User.findOrCreate({
      where: { email: "alice.brown@gmail.com" },
      defaults: {
        name: "Alice Brown",
        email: "alice.brown@gmail.com",
        password:
          "$2a$10$tapCxRRJUD8poKBdkn0mUe2oLy5QbGuu/yIoE2RL.aHztyG.O6jha",
        staffId: staff3.staffId,
        createdBy: "admin",
        updatedBy: "admin",
      },
    });
    const [user4] = await User.findOrCreate({
      where: { email: "bob.johnson@gmail.com" },
      defaults: {
        name: "Bob Johnson",
        email: "bob.johnson@gmail.com",
        password:
          "$2a$10$tapCxRRJUD8poKBdkn0mUe2oLy5QbGuu/yIoE2RL.aHztyG.O6jha",
        staffId: staff4.staffId,
        createdBy: "admin",
        updatedBy: "admin",
      },
    });
    const [user5] = await User.findOrCreate({
      where: { email: "eve.white@gmail.com" },
      defaults: {
        name: "Eve White",
        email: "eve.white@gmail.com",
        password:
          "$2a$10$tapCxRRJUD8poKBdkn0mUe2oLy5QbGuu/yIoE2RL.aHztyG.O6jha",
        staffId: staff5.staffId,
        createdBy: "admin",
        updatedBy: "admin",
      },
    });
    const [user6] = await User.findOrCreate({
      where: { email: "james.black@gmail.com" },
      defaults: {
        name: "James Black",
        email: "james.black@gmail.com",
        password:
          "$2a$10$tapCxRRJUD8poKBdkn0mUe2oLy5QbGuu/yIoE2RL.aHztyG.O6jha",
        staffId: staff6.staffId,
        createdBy: "admin",
        updatedBy: "admin",
      },
    });

    // Assign roles to users
    await UserRole.findOrCreate({
      where: { userId: superAdminUser.userId, roleId: superAdminRole.roleId },
    });
    await UserRole.findOrCreate({
      where: { userId: user1.userId, roleId: managerRole.roleId },
    });
    await UserRole.findOrCreate({
      where: { userId: user2.userId, roleId: managerRole.roleId },
    });
    await UserRole.findOrCreate({
      where: { userId: user3.userId, roleId: standardRole.roleId },
    });
    await UserRole.findOrCreate({
      where: { userId: user4.userId, roleId: standardRole.roleId },
    });
    await UserRole.findOrCreate({
      where: { userId: user5.userId, roleId: standardRole.roleId },
    });
    await UserRole.findOrCreate({
      where: { userId: user6.userId, roleId: standardRole.roleId },
    });

    // Assign permissions to roles
    await RolePermission.findOrCreate({
      where: {
        roleId: superAdminRole.roleId,
        permissionId: viewAllStaffPermission.permissionId,
      },
    });
    await RolePermission.findOrCreate({
      where: {
        roleId: managerRole.roleId,
        permissionId: managePermission.permissionId,
      },
    });
    await RolePermission.findOrCreate({
      where: {
        roleId: managerRole.roleId,
        permissionId: viewPermission.permissionId,
      },
    });
    await RolePermission.findOrCreate({
      where: {
        roleId: standardRole.roleId,
        permissionId: viewPermission.permissionId,
      },
    });

    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

module.exports = initDatabase;
