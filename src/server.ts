import express, { Application, Request, Response, NextFunction } from "express";
import routes from "./routes/index";

const cors = require("cors");

export default function buildServer() {
  const app: Application = express();

  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello world!");
  });

  app.use(cors());

  app.use(express.json());
  app.use(routes);

  return app;
}
