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
};
