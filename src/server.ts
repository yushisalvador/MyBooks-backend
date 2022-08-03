import express, { Application, Request, Response } from "express";
import routes from "./routes/index";

const cors = require("cors");

export default function buildServer() {
  const app = express();

  app.use(cors());

  app.use(express.json());
  app.use(routes);

  return app;
}
