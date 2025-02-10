import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import config from "../config/index.js";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      requierd: true,
    },
    email: {
      type: String,
      requierd: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "member",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    authProviderId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (this.password) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(
        this.password,
        parseInt(config.bcrypt_salt_round)
      );
    }
  }
  next();
});

export const User = model("User", UserSchema);
