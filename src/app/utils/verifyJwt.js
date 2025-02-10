import jwt from "jsonwebtoken";
import { AppError } from "../error/AppError.js";
import { StatusCodes } from "http-status-codes";

export const verifyJwt = async (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
  }
};
