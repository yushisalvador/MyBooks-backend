const express = require("express");
const authController = require("../auth/auth.controller");
const router = express.Router();

const middleware = require("../middleware/middleware");

// @desc Get all user, mainly for testing
// @access Private
// @route POST /auth/users

router.get(
  "/users",
  middleware.authenticateFunction,
  authController.getAllUsers
);

// @desc Register a new account to the database
// @access Public
// @route POST /auth/register

router.post("/register", authController.addUser);

// @desc Login to account
// @access Authenticated only
// @route POST /auth/login
router.post("/login", authController.login);

// @desc Generate new access token
// @access Authenticated only
// @route POST /auth/token
router.post("/token", authController.getAccessToken);

// @desc Delete certain user
// @access Authenticated only
// @route DELETE /auth/user?username

router.delete(
  "/user",
  middleware.authenticateFunction,
  authController.deleteUser
);

// @desc Logout, delete refresh token
// @route DELETE /auth/logout/:id
router.delete("/logout/:id", authController.logout);

export default router;
