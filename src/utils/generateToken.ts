import { User, Token } from "../types/types";
const config = require("../../knexfile");
const knex = require("knex")(config);

const jwt = require("jsonwebtoken");

interface Tokens {
  accessToken: Token;
  refreshToken: Token;
}

const generateTokens = async (user: User): Promise<Tokens | null> => {
  try {
    const payload = {
      id: user.id,
      username: user.username,
    };
    const accessToken: Token = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1m", // TODO: make this 15m and deduplicate
      }
    );
    const refreshToken: Token = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );

    const token = await knex
      .select("*")
      .from("tokens")
      .where("user_id", user.id);

    if (token) {
      console.log("refresh token already in database - updating it");
      await knex("tokens")
        .update({ refreshToken: refreshToken })
        .where("user_id", user.id);
    } else {
      console.log("adding new refresh token to database");
      await knex
        .insert({ user_id: user.id, refreshToken: refreshToken })
        .into("tokens");
    }

    return { accessToken, refreshToken };
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default generateTokens;
