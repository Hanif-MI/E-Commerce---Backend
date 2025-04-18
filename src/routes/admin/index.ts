import express from "express";
import { authRoute } from "./auth.route";

export const adminRoute = express.Router();
adminRoute.use("/", authRoute);

// adminRoute.use()

