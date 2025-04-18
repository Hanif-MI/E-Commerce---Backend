import express  from "express";
import { adminRoute } from "./admin";

export const router = express.Router();

router.use("/admin", adminRoute)