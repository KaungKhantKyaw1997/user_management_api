const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/dbConfig");
const authRoutes = require("./routes/authRoutes");
const staffRoutes = require("./routes/staffRoutes");
const initDatabase = require("./dbSetup");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", staffRoutes);

db.authenticate()
  .then(() => {
    console.log("Database connected successfully");
    return initDatabase();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });
