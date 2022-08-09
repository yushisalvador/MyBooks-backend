const express = require("express");

import auth from "./auth";
import books from "./books";

const router = express.Router();

router.use("/auth", auth);
router.use("/api", books);

export default router;
