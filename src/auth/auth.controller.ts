require("dotenv").config();

import { Request, Response } from "express";
import {
  generateAccessToken,
  generateTokens,
  verifyRefreshToken,
} from "../utils/generateToken";

const bcrypt = require("bcrypt");
const authModel = require("./auth.model.ts");

export async function getAllUsers(req: Request, res: Response) {
  const allUsers = await authModel.getAllUsers();
  res.status(200).send(allUsers);
  return;
}

export async function deleteUser(req: Request, res: Response) {
  const username = req.query.username;
  await authModel.deleteUser(username);
  res.status(200).send("done!");
  return;
}

// function to register a new user. upon registration,
//the password is hashed before being stored to the database.
export async function addUser(req: Request, res: Response) {
  const username: String = req.body.username;
  const password: String = req.body.pass;

  const existingUser = await authModel.getUser(username);
  if (existingUser) {
    res
      .status(409)
      .send(
        "A user with this username already exists. Please choose a different username."
      );
    return;
  }

  if (!username || !password) {
    res.status(401).send("Username and password are required!");
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  const newUser = {
    username: username,
    pass: hashedPass,
  };
  await authModel.registerNewUser(newUser);
  res.status(201).send("Added!");
}

//function to login an existing user.First, the function checks if the username exists in the db.
// After that, password is read an access token is provided if successful
export async function login(req: Request, res: Response) {
  const user = await authModel.getUser(req.body.username);

  if (!user) {
    res.status(404).send("Cannot find user");
    return;
  }

  const passwordMatches = await bcrypt.compare(req.body.pass, user.pass);
  if (!passwordMatches) {
    res.status(401).send("Could not verify user!");
    return;
  }

  const tokens = await generateTokens(user);
  if (tokens === null) {
    res.status(401).send("Could not generate tokens!");
    return;
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
  return;
}

export async function getAccessToken(req: Request, res: Response) {
  const refreshToken: String = req.body.refreshToken;
  const username: String = req.body.username;

  const dbRefreshToken = await authModel.getRefreshToken(refreshToken);
  if (!dbRefreshToken.length) {
    res.status(403).send("Could not find refreshToken in database");
    return;
  }

  const isVerified = verifyRefreshToken(refreshToken);

  if (!isVerified) {
    res.status(403).send("Failed to verify refreshToken");
    return;
  }

  const accessToken = generateAccessToken(username);
  res.status(200).send({ accessToken: accessToken });
  return;
}

export async function logout(req: Request, res: Response) {
  const id = req.params.id;
  await authModel.logout(id);
  res.status(200).send("Successfully logged out!");
  return;
}
