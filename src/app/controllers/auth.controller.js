import { AppError } from "../error/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.model.js";
import { generateTokens } from "../utils/generateTokens.js";
import config from "../config/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// -Register new user
// -Api Endpoint /user/auth/register
// -Method POST

const registerUser = catchAsync(async (req, res) => {
  const user = req.body;

  const { email, name, password } = user;

  if (!name || !email || !password) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Please provide name, email & password"
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Email already exists");
  }

  const newUser = await User.create(user);

  const { accessToken, refreshToken } = generateTokens({
    _id: newUser._id.toString(),
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    createdAt: newUser.createdAt,
    updatedAt: newUser.updatedAt,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_env === "production",
    sameSite: "strict",
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered",
    data: {
      accessToken,
      refreshToken,
    },
  });
});

// -login  user
// -Api Endpoint /user/auth/login
// -Method POST

const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Please provide email & password"
    );
  }

  const user = await User.findOne({ email });
  //   return res.send(user)

  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Email does not exists");
  }

  const isPassMatched = await bcrypt.compare(
    password.toString(),
    user.password
  );

  if (!isPassMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Password does not match");
  }

  const { accessToken, refreshToken } = generateTokens({
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_env === "production",
    sameSite: "strict",
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Logged in successfully",
    data: {
      accessToken,
      refreshToken,
    },
  });
});

// -refresh accessToken
// -Api Endpoint /user/auth/refreshToken
// -Method POST

export const refreshAccessToken = catchAsync(async (req, res) => {
  // * get the refresh token
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized");
  }

  // * Verify the refresh token and create new refresh token

  jwt.verify(refreshToken, config.refresh_token_secret, (err, user) => {
    if (err) throw new AppError(StatusCodes.FORBIDDEN, "Forbidded");

    const newAccessToken = jwt.sign(
      {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      config.access_token_secret,
      {
        expiresIn: config.access_token_expiry,
      }
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "AccessToken refreshed",
      data: {
        accessToken: newAccessToken,
      },
    });
  });
});

//* -delete refreshToken
//  -Api Endpoint /user/auth/refreshToken
//! -Method DELETE

const logoutUser = catchAsync((req, res) => {
  res.clearCookie("refreshToken");
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Logged out scuccessfully",
    data: null,
  });
});

export const authController = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
};
