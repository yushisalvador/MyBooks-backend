import { Request, Response, NextFunction } from "express";
import { User } from "types/types";
require("dotenv").config();
const jwt = require("jsonwebtoken");

declare module "express" {
  export interface Request {
    user: User;
  }
}

const authenticateFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(403);

  try {
    const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (e) {
    return res.sendStatus(403);
  }
};

module.exports = {
  authenticateFunction,
};
