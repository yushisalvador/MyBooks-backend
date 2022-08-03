import { Router, Request, Response } from "express";
const userController = require("../user/user.controller");
const router = Router();

router.get("/", userController.getAllUsers);

//POST
router.post("/register", userController.addUser);
router.post("/login", userController.login);

//DELETE

router.delete("/", userController.deleteUser);
export default router;
