import { AppError } from "../error/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.model.js";

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

  const existingUser = await User.find({ email });

  if (existingUser) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Email already exists");
  }

  const newUser = await User.create(user);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered",
    data: null,
  });
});

export const userController = {
  registerUser,
};
