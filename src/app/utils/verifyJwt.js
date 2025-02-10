import jwt from "jsonwebtoken";

export const verifyJwt = async (token, secret) => {
  const decoded = jwt.verify(token, secret);
};
