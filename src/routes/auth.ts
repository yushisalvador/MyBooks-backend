const express = require("express");
const authController = require("../auth/auth.controller");
const router = express.Router();

const middleware = require("../middleware/middleware");

router.get("/", middleware.authenticateFunction, authController.getAllUsers);

//POST
router.post("/register", authController.addUser);
router.post("/login", authController.login);
router.post("/token", authController.getAccessToken);

//DELETE

router.delete("/", authController.deleteUser);
router.delete("/logout", authController.logout);
export default router;
