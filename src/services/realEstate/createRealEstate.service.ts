import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../error";
import { IRealState } from "../../interfaces/realEstate.inteface";

const createRealEstateService = async (
  payload: IRealState
): Promise<RealEstate> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
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

  if (findAdresses) {
    throw new AppError("Address already exists", 409);
  }

  const getCategory = await categoryRepository.findOne({
    where: { id: payload.categoryId },
  });
  if (getCategory === undefined) {
    throw new AppError("Category Not Found", 409);
  }
  const newAddress = addressesRepository.create({
    ...payload.address,
  });
  await addressesRepository.save(newAddress);
  const newRealEstate = realEstateRepository.create({
    ...payload,
    address: newAddress,
    category: getCategory!,
  });
  await realEstateRepository.save(newRealEstate);
  return newRealEstate;
};
export { createRealEstateService };
