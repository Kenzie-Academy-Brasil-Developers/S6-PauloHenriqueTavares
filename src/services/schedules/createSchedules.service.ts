import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../error";
import { ISchedulesSchema } from "../../interfaces/schedules.interfaces";

const createSchedulesService = async (
  schedulesData: ISchedulesSchema,
  userId: number
): Promise<{}> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const realEstate = await realEstateRepository.findOneBy({
    id: schedulesData.realEstateId,
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const scheduleTimeDateExists = await scheduleRepository
    .createQueryBuilder("Schedule")
    .where("Schedule.hour = :hour", { hour: schedulesData.hour })
    .andWhere("Schedule.realEstateId = :realEstateId", {
      realEstateId: schedulesData.realEstateId,
    })
    .getOne();

  if (scheduleTimeDateExists) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }
  const scheduleUserTimeDateExists = await scheduleRepository
    .createQueryBuilder("Schedule")
    .where("Schedule.user = :idUser", { idUser: userId })
    .andWhere("Schedule.hour = :hour", { hour: schedulesData.hour })
    .getOne();

  if (scheduleUserTimeDateExists) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const hourSplit = schedulesData.hour.split(":");
  const visitTime = parseInt(hourSplit[0]);

  if (visitTime <= 8 || visitTime >= 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const [ano, mes, dia] = schedulesData.date.split("/").map(Number);
  const visitDay = new Date(ano, mes - 1, dia);
  const day = visitDay.getUTCDay();

  if (day === 0 || day === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const user = await userRepository.findOneBy({
    id: userId,
  });
  const date = schedulesData.date;
  const newSchedules = scheduleRepository.create({
    date: date,
    hour: schedulesData.hour,
    realEstate: realEstate!,
    user: user!,
  });
  await scheduleRepository.save(newSchedules);

  return { message: "Schedule created" };
};
export default createSchedulesService;
