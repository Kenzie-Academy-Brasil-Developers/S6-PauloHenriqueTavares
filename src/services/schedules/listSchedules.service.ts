import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule } from "../../entities";
import { AppError } from "../../error";

const listSchedulesService = async (id: number): Promise<{}> => {
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstateExist: boolean = await realEstateRepository.exist({
    where: {
      id: id,
    },
  });

  if (!realEstateExist) {
    throw new AppError("RealEstate not found", 404);
  }

  const listRealEstate = await realEstateRepository
    .createQueryBuilder("RealEstate")
    .leftJoinAndSelect("RealEstate.address", "address")
    .leftJoinAndSelect("RealEstate.category", "category")
    .where("RealEstate.id = :id", { id: id })
    .getOne();

  const listSchudles = await scheduleRepository
    .createQueryBuilder("Schedule")
    .leftJoinAndSelect("Schedule.user", "scheduleUser")
    .where("Schedule.realEstateId = :realEstateId", { realEstateId: id })
    .getMany();

  return { ...listRealEstate, schedules: listSchudles };
};
export { listSchedulesService };
