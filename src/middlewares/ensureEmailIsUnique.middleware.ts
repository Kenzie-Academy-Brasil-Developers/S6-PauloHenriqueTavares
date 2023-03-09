import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../error";

const ensureEmailExits = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.body.email === undefined) {
    return next();
  }
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const findUserEmail = await userRepository.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (findUserEmail) {
    throw new AppError("Email already exists", 409);
  }
  return next();
};
export default ensureEmailExits;
