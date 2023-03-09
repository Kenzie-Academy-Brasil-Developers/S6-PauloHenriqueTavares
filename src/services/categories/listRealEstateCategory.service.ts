import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../error";

const listRealEstateCategoryService = async (id: number): Promise<Category> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const allRealEstates = await categoryRepository
    .createQueryBuilder("Category")
    .select(["Category", "realEstate"])
    .innerJoin("Category.realEstate", "realEstate")
    .where("Category.id = :id", { id: id })
    .getOne();

  if (!allRealEstates) {
    throw new AppError("Category not found", 404);
  }

  return allRealEstates;
};
export { listRealEstateCategoryService };
