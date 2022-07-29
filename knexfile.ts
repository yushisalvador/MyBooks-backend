import type { Knex } from "knex";

require("dotenv").config({
  path: "./.env",
});

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },

  production: {
    client: "pg",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};

module.exports = config;
