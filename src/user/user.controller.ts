require("dotenv").config();

import console from "console";
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

  async addUser(req: Request, res: Response) {
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

  async login(req: Request, res: Response) {
    const users = await knex.select("*").from("users");
    const user = users.find(
      (userObj: any) => userObj.username === req.body.username
    );
    if (user === null) {
      return res.status(401).send("cannot find user");
    }

    const passwordCheck = await bcrypt.compare(req.body.pass, user.pass);

    if (passwordCheck) {
      await userModel.loginUser(req.body.username, req.body.pass);
      const userInfo = {
        username: req.body.username,
        pass: req.body.pass,
      };
      const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);
      res.status(200).json({
        accessToken: accessToken,
        username: userInfo.username,
      });
    } else {
      res.status(401).send("could not verify user!");
    }
  },
};
