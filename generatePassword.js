const bcrypt = require("bcryptjs");

const generatePasswordHash = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Hashed Password:", hashedPassword);
  } catch (error) {
    console.error("Error generating password hash:", error);
  }
};

const password = "User@123";
generatePasswordHash(password);
