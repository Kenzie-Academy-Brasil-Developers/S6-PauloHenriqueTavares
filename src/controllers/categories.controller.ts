import { Request, Response } from "express";
import createCategoryService from "../services/categories/createCategory.service";
import { listCategoryService } from "../services/categories/listCategory.service";
import { listRealEstateCategoryService } from "../services/categories/listRealEstateCategory.service";

const createCategory = async (req: Request, res: Response) => {
  const categoriesData = req.body;
  const newCategories = await createCategoryService(categoriesData);
  return res.status(201).json(newCategories);
};
const listCategorys = async (req: Request, res: Response) => {
  const listAllCategories = await listCategoryService();
  return res.json(listAllCategories);
};
const listRealEstateCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const allRealEstates = await listRealEstateCategoryService(id);
  return res.json(allRealEstates);
};
export { createCategory, listCategorys, listRealEstateCategory };
