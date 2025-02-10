import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";
import { Iuser } from "@/types";

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
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
  next();
});

export const User = model("User", UserSchema);
