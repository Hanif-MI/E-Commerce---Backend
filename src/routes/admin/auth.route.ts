import { signUp } from "../../controllers/admin/auth.controller";
import express from "express";
export const authRoute = express.Router();

authRoute.post("/sign-up", signUp);