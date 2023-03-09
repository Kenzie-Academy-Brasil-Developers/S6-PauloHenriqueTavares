import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Address } from "../entities";
import { AppError } from "../error";

const ensureAdress = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const payload = req.body;
  const addressesRepository: Repository<Address> =
    AppDataSource.getRepository(Address);
  const findAdresses = await addressesRepository.findOne({
    where: {
      street: payload.address.street,
      zipCode: payload.address.zipCode,
      city: payload.address.city,
      state: payload.address.state,
    },
  });
  const isTrue = findAdresses === null;
  if (!isTrue) {
    throw new AppError("Adress already exists", 409);
  }
  return next();
};
export default ensureAdress;
