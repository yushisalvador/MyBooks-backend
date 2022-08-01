import console from "console";
import { Request, Response } from "express";
const config = require("../../knexfile");
const knex = require("knex")(config);
const bcrypt = require("bcrypt");
const userModel = require("./user.model.ts");

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
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.pass, salt);
    const newUser = {
      username: req.body.username,
      pass: hashedPass,
    };
    await userModel.registerNewUser(newUser);
    res.status(201).send("added!");
  },

  async login(req: Request, res: Response) {
    const users = await knex.select("*").from("users");
    console.log("USERS ALL", users);
    const user = users.find(
      (userObj: any) => userObj.username === req.body.username
    );
    if (user === null) {
      return res.status(401).send("cannot find user");
    }

    const password = await bcrypt.compare(req.body.pass, user.pass);

    if (password) {
      await userModel.loginUser(req.body.username, req.body.pass);
      res.status(200).send("logged in successfully!");
    } else {
      res.status(401).send("could not verify user!");
    }
  },
};
