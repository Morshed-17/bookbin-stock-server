import { StatusCodes } from "http-status-codes";
import { AppError } from "../error/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import { verifyJwt } from "../utils/verifyJwt.js";
import config from "../config/index.js";
import { User } from "../models/user.model.js";

export const auth = (...requiredRoles) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    //check if the token is available
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
    }

    const decoded = await verifyJwt(token, config.access_token_secret);

    const { email, role, iat } = decoded;

    // check if the users exists

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "This user is not found !");
    }

    const isVerified = user?.isVerified;

    if (isVerified !== true) {
      throw new AppError(StatusCodes.FORBIDDEN, "This user is not verified !");
    }
    
    console.log(role)
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
    }

    req.user = decoded;
    next();
  });
};
