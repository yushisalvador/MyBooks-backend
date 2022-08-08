import { verify } from "crypto";
import { User, Token } from "../types/types";
const config = require("../../knexfile");
const knex = require("knex")(config);

const jwt = require("jsonwebtoken");

interface Tokens {
  accessToken: Token;
  refreshToken: Token;
}

export function generateAccessToken(username: String): Token {
  return jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
}

export function generateRefreshToken(username: String): Token {
  return jwt.sign({ username: username }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
}

export function verifyToken(refreshToken: String): Boolean {
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
}

export async function generateTokens(user: User): Promise<Tokens | null> {
  try {
    const accessToken: Token = generateAccessToken(user.username);
    const refreshToken: Token = generateRefreshToken(user.username);

    const token = await knex
      .select("*")
      .from("tokens")
      .where("user_id", user.id);

    if (token.length) {
      await knex("tokens")
        .update({ refreshToken: refreshToken })
        .where("user_id", user.id);
    } else {
      await knex
        .insert({ user_id: user.id, refreshToken: refreshToken })
        .into("tokens");
    }

    return { accessToken, refreshToken };
  } catch (err) {
    console.log(err);
    return null;
  }
}
