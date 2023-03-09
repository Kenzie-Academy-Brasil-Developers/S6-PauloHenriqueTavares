import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";

const listRealEstatesService = async (): Promise<any> => {
  const realStateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const allRealEstates = await realStateRepository
    .createQueryBuilder("RealEstate")
    .select(["RealEstate", "address"])
    .innerJoin("RealEstate.address", "address")
    .getMany();
  return allRealEstates;
};
export { listRealEstatesService };
