import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import {
  ICategoryReturn,
  ICreateCategory,
} from "../../interfaces/categories.intefaces";
import { Category } from "../../entities";
import { AppError } from "../../error";
const createCategoryService = async (
  data: ICreateCategory
): Promise<ICategoryReturn> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const findUser = await categoryRepository.findOneBy({
    name: data.name,
  });

  if (findUser) {
    throw new AppError("Category already exists", 409);
  }
  const category: Category = categoryRepository.create(data);
  await categoryRepository.save(category);
  return category;
};
export default createCategoryService;
