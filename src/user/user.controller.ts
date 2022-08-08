require("dotenv").config();

import { User } from "../types/types";
import { Request, Response } from "express";
const config = require("../../knexfile");
const knex = require("knex")(config);
const bcrypt = require("bcrypt");
const userModel = require("./user.model.ts");
import { generateAccessToken, generateTokens } from "../utils/generateToken";
const jwt = require("jsonwebtoken");

module.exports = {
  async getAllUsers(req: Request, res: Response) {
    const allUsers = await userModel.getAllUsers();
    res.send(allUsers);
  },

  async deleteUser(req: Request, res: Response) {
    const username = req.query.username;
    await userModel.deleteUser(username);
    res.status(200).send("done!");
  },
  // function to register a new user. upon registration, the password is hashed before being stored to the database.
  async addUser(req: Request, res: Response) {
    const allUsers = await knex.select("*").from("users");
    const checkIfUserNameExists = allUsers.find(
      (user: User) => user.username === req.body.username
    );

    if (checkIfUserNameExists) {
      res
        .status(409)
        .send(
          "A user with this username already exists. Please choose a different username."
        );
    } else if (req.body.username && req.body.pass) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.pass, salt);
      const newUser = {
        username: req.body.username,
        pass: hashedPass,
      };
      await userModel.registerNewUser(newUser);
      res.status(201).send("added!");
    } else {
      res.status(401).send("Username and password are required!");
    }
  },

  //function to login an existing user.First, the function checks if the username exists in the db.
  // After that, password is read an access token is provided if successful
  async login(req: Request, res: Response) {
    const user = await userModel.getUser(req.body.username);

    if (!user) {
      return res.status(404).send("cannot find user");
    }

    const passwordMatches = await bcrypt.compare(req.body.pass, user.pass);
    if (!passwordMatches) {
      return res.status(401).send("could not verify user!");
    }

    const tokens = await generateTokens(user);
    if (tokens === null) {
      return res.status(401).send("could not generate tokens!");
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
  },

  async getAccessToken(req: Request, res: Response) {
    const refreshToken: String = req.body.refreshToken;
    const username: String = req.body.username;
    // - if refreshToken is not present in the database, 403
    const dbRefreshToken = await knex
      .select("refreshToken")
      .from("tokens")
      .where("tokens.refreshToken", refreshToken);

    if (!dbRefreshToken.length) {
      return res.status(403).send("could not find refreshToken in database");
    }
    // - if refreshToken is not valid, 403
    const isVerified = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!isVerified) {
      return res.status(403).send("failed to verify refreshToken");
    }

    const accessToken = generateAccessToken(username);
    return res.status(200).send({ accessToken: accessToken });
  },

  async logout(req: Request, res: Response) {
    const id = req.query.id;
    await userModel.logout(id);
    res.status(200).send("successfully logged out!");
  },
};
