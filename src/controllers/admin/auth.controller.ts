import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { authValidations } from "src/validations/admin/auth.validation";
import { sendMail } from "src/services/mail.service";
import { decodeToken } from "src/services/token.service";

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

        const result  = await sendMail(email,newUser.id);
        console.log("Email sent result:", result);
        if (result instanceof Error) {  
          console.error("Error sending email:", result);
          return res.status(500).json({
            message: "Error sending email",
          });
        }

        return res.status(201).json({
          message: "User created successfully, Please check you mail i was sended to you a verification link",
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

const verifyEmail = async (req: Request, res: Response) => {
authValidations.loginSchema(req, res, async (result: boolean) => {
  try {
    const { token } = req.params;
    const decodedToken = decodeToken(token); // Assumes JWT or similar decoding
    if (!decodedToken || !decodedToken.id) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = await User.findOne({ where: { id: decodedToken.id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.is_verified) {
      return res.status(400).json({ message: "User already verified" });
    }

    user.is_verified = true;
    await user.save();

    return res.status(200).json({ message: "Email successfully verified" });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
})
  
};

export { signUp, verifyEmail };
