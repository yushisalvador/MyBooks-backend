const express = require("express");
const userController = require("../user/user.controller");
const router = express.Router();

const middleware = require("../middleware/middleware");

router.get("/", middleware.authenticateFunction, userController.getAllUsers);

//POST
router.post("/register", userController.addUser);
router.post("/login", userController.login);
router.post("/token", userController.getAccessToken);

//DELETE

router.delete("/", userController.deleteUser);
router.delete("/logout", userController.logout);
export default router;
