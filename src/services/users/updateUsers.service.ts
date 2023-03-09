import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../error";
import { IUserReturn } from "../../interfaces/users.intefaces";
import { userReturnSchema } from "../../schemas/user.schema";

const updateUserService = async (
  userData: User,
  idUser: number,
  isAdm: { admin: boolean; id: number }
): Promise<IUserReturn> => {
  if (isAdm.admin === false) {
    if (isAdm.id != idUser) {
      throw new AppError("Insufficient permission", 403);
    }
  }
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const oldUserData = await userRepository.findOneBy({
    id: idUser,
  });
  const user = userRepository.create({
    ...oldUserData,
    ...userData,
  });
  await userRepository.save(user);
  const updatedUser = userReturnSchema.parse(user);

  return updatedUser;
};
export default updateUserService;
