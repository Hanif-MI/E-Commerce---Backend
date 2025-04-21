import { Request, Response } from "express";
import Joi from "joi";

export const authValidations = {
  loginSchema: (
    req: Request,
    res: Response,
    callback: (result: boolean) => {}
  ) => {
    const schema = Joi.object({
      email: Joi.string()
        .email()
        .required()
        .trim()
        .pattern(/^[^+]+$/),
      password: Joi.string().min(6).required(),
      phone: Joi.string().min(10).max(15).optional(),
      name: Joi.string().min(3).max(30).optional(),
      role: Joi.string().valid("admin", "user").required(),
    });

    const { error } = schema.validate(req.body);
    if (error) res.send(`Something went wrong ${error.message}`);
    return callback(true);
  },
};


export const verifyEmailSchema = (
  req: Request,
  res: Response,
  callback: (result: boolean) => {}
) => {
  const schema = Joi.object({
    token: Joi.string().required(),
  });

  const { error } = schema.validate(req.params);
  if (error) res.send(`Something went wrong ${error.message}`);
  return callback(true);
};