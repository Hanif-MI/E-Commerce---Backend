import dotenv from "dotenv";
dotenv.config();
import { sequelize } from "./models";
import express from "express";
import http from "http";
import Config from "./config/index";
import { router } from "./routes";

const app = express();
const server = http.createServer(app);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use("/api", router);

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected.");
    return sequelize.sync();
  })
  .then(() => {
    server.listen(Config.PORT, () => {
      console.log(`Server is running on port ${Config.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
