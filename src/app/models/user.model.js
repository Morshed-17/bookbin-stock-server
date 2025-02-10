import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

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

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

export const User = model("User", UserSchema);
