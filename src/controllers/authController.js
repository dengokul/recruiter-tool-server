import { JWTTokenKey } from "../config/constant.js";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";

export const getCurrentUser = async (token) => {
  if (!token) return null;
  let decodedToken = jwt.verify(token, JWTTokenKey);
  if (!decodedToken) return null;
  return decodedToken;
};

export const doAuth = (next) => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError("You must be logged in");
  }
  return next(root, args, ctx, info);
};
