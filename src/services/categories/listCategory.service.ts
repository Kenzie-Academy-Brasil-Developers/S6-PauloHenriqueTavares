import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { ICategoryReturn } from "../../interfaces/categories.intefaces";
const listCategoryService = async (): Promise<ICategoryReturn[]> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const findCategorys: ICategoryReturn[] = await categoryRepository.find();
  return findCategorys;
};
export { listCategoryService };
