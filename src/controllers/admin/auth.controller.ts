import { Request, Response } from "express";
import models from "../../models/index"; // Adjust path as needed
import { User } from "../../models/user.model";
import { authValidations } from "src/validations/admin/auth.validation";

const signUp = async (req: Request, res: Response) => {
  authValidations.loginSchema(req, res, async (result: boolean) => {
    if (result) {
      const { name, email, phone, password, role } = req.body;
      console.log("Request body:", name, email, phone, password);
      try {
        const existingUser = await User.findOne({
          where: {
            email,
          },
        });
        if (existingUser) {
          return res.status(400).json({
            message: "User with this email or phone already exists",
          });
        }
        const newUser = await User.create({
          name,
          email,
          phone,
          password,
          is_verified: false,
          is_active: true,
          role: role,
        });
        return res.status(201).json({
          message: "User created successfully",
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            is_verified: newUser.is_verified,
            is_active: newUser.is_active,
            role: newUser.role,
          },
        });
      } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
          message: "Internal server error",
        });
      }
    } else {
      return res.status(400).json({
        message: "Validation failed",
      });
    }
  });
};

const signIn = async (req: Request, res: Response) => {
  // const { email, password } = req.body;
  // const user = await authService.signIn(email, password);
  // res.status(200).json(user);
  res.status(200).json({ message: "Sign In" });
};

export { signUp };
