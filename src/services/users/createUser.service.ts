import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IUserReturn } from "../../interfaces/users.intefaces";
import { userReturnSchema } from "../../schemas/user.schema";

const createUserService = async (userData: User): Promise<IUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user: User = userRepository.create(userData);
  await userRepository.save(user);
  const newUser = userReturnSchema.parse(user);
  return newUser;
};
export default createUserService;
