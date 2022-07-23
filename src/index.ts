import "dotenv/config";
import express, { Application, Request, Response, NextFunction } from "express";
import buildServer from "server";

const startServer = () => {
  const app = buildServer();
  const port: number = parseInt(<string>process.env.PORT, 10) || 8080;
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};

startServer();
