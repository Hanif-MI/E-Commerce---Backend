import "module-alias/register";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import Config from "./config/index";

const app = express();
const server = http.createServer(app);

// Middleware to parse JSON requests
app.use(express.json());
// Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));
// Middleware to serve static files
app.use(express.static("public"));
// Middleware to log requests
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });


server.listen(Config.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
