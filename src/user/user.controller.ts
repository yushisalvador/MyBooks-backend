require("dotenv").config();

import { Request, Response } from "express";
import {
  generateAccessToken,
  generateTokens,
  verifyToken,
} from "../utils/generateToken";

const bcrypt = require("bcrypt");
const userModel = require("./user.model.ts");

export async function getAllUsers(req: Request, res: Response) {
  const allUsers = await userModel.getAllUsers();
  res.send(allUsers);
}

export async function deleteUser(req: Request, res: Response) {
  const username = req.query.username;
  await userModel.deleteUser(username);
  res.status(200).send("done!");
}
// function to register a new user. upon registration,
//the password is hashed before being stored to the database.
export async function addUser(req: Request, res: Response) {
  const username: String = req.body.username;
  const password: String = req.body.pass;
  const existingUser = await userModel.getUser(username);
  if (existingUser) {
    res
      .status(409)
      .send(
        "A user with this username already exists. Please choose a different username."
      );
  } else if (username && password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = {
      username: username,
      pass: hashedPass,
    };
    await userModel.registerNewUser(newUser);
    res.status(201).send("Added!");
  } else {
    res.status(401).send("Username and password are required!");
  }
}

//function to login an existing user.First, the function checks if the username exists in the db.
// After that, password is read an access token is provided if successful
export async function login(req: Request, res: Response) {
  const user = await userModel.getUser(req.body.username);
  if (!user) {
    return res.status(404).send("Cannot find user");
  }

  const passwordMatches = await bcrypt.compare(req.body.pass, user.pass);
  if (!passwordMatches) {
    return res.status(401).send("Could not verify user!");
  }

  const tokens = await generateTokens(user);
  if (tokens === null) {
    return res.status(401).send("Could not generate tokens!");
  }
  const { accessToken, refreshToken } = tokens;

  res.status(200).json({
    auth: true,
    id: user.id,
    username: user.username,
    accessToken: accessToken,
    refreshToken: refreshToken,
    message: "Logged in successfully",
  });
}

export async function getAccessToken(req: Request, res: Response) {
  const refreshToken: String = req.body.refreshToken;
  const username: String = req.body.username;

  // - if refreshToken is not present in the database, 403
  const dbRefreshToken = userModel.getRefreshToken(refreshToken);
  if (!dbRefreshToken.length) {
    return res.status(403).send("Could not find refreshToken in database");
  }
  // - if refreshToken is not valid, 403
  const isVerified = verifyToken(refreshToken);

  if (!isVerified) {
    return res.status(403).send("Failed to verify refreshToken");
  }

  const accessToken = generateAccessToken(username);
  return res.status(200).send({ accessToken: accessToken });
}

export async function logout(req: Request, res: Response) {
  const id = req.query.id;
  await userModel.logout(id);
  res.status(200).send("Successfully logged out!");
}
