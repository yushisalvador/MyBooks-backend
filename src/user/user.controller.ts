require("dotenv").config();

import { User } from "../types/types";
import { Request, Response } from "express";
const config = require("../../knexfile");
const knex = require("knex")(config);
const bcrypt = require("bcrypt");
const userModel = require("./user.model.ts");
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
  // function to register a new user. upon rgeistration, the password is hashed before being stored in the database.
  async addUser(req: Request, res: Response) {
    const allUsers = await knex.select("*").from("users");
    const checkIfUserNameExists = await allUsers.find((user: User) => {
      user.username === req.body.username;
    });

    if (checkIfUserNameExists) {
      res
        .status(409)
        .send(
          "A user with this username already exists. Please choose a different username."
        );
    }
    if (req.body.username && req.body.pass) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.pass, salt);
      const newUser = {
        username: req.body.username,
        pass: hashedPass,
      };
      await userModel.registerNewUser(newUser);
    } else {
      res.status(401).send("Username and password are required!");
    }

    res.status(201).send("added!");
  },

  //function to login an existing user.First, the function checks if the username exists in the db.
  // After that, password is read an access token is provided if successful
  async login(req: Request, res: Response) {
    const users = await knex.select("*").from("users");
    const user = users.find(
      (userObj: User) => userObj.username === req.body.username
    );

    if (!user) {
      return res.status(404).send("cannot find user");
    }

    const passwordMatches = await bcrypt.compare(req.body.pass, user.pass);

    if (passwordMatches) {
      await userModel.loginUser(req.body.username, req.body.pass);

      const userInfo = {
        username: req.body.username,
        pass: req.body.pass,
      };

      const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);

      res.status(200).json({
        auth: true,
        accessToken: accessToken,
        username: userInfo.username,
      });
    } else {
      res.status(401).send("could not verify user!");
    }
  },
};
