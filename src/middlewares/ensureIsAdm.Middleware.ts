import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const ensureAdm = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const autheticatedUser = request.user;
  if (autheticatedUser.admin !== true) {
    throw new AppError("Insufficient permission", 403);
  }
  return next();
};
export default ensureAdm;
