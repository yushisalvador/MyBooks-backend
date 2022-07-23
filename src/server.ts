import express, { Application, Request, Response, NextFunction } from "express";
const PORT = 8080;

export default function buildServer() {
  const app: Application = express();

  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello world!");
  });

  return app;
}
