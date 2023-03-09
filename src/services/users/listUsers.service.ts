import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IUserReturn } from "../../interfaces/users.intefaces";
import { returnMultipleUserSchema } from "../../schemas/user.schema";

const listUsersService = async (): Promise<IUserReturn[]> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const findUsers = await userRepository.find();
  const users: IUserReturn[] = returnMultipleUserSchema.parse(findUsers);
  return users;
};
export { listUsersService };
