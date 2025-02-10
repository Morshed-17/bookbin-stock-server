import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const generateTokens = (user) => {
  console.log(user)
  const accessToken = jwt.sign(user, config.access_token_secret, {
    expiresIn: config.access_token_expiry,
  });

  const refreshToken = jwt.sign(user, config.refresh_token_secret, {
    expiresIn: config.refresh_token_expiry,
  });

  return { accessToken, refreshToken };
};
