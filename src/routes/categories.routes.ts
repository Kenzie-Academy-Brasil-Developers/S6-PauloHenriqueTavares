import { Router } from "express";
import {
  createCategory,
  listCategorys,
  listRealEstateCategory,
} from "../controllers/categories.controller";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureAdm from "../middlewares/ensureIsAdm.Middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import { createCategorySchema } from "../schemas/categories.schema";

const categoriesRouter: Router = Router();

categoriesRouter.post(
  "",
  ensureDataIsValidMiddleware(createCategorySchema),
  ensureTokenIsValidMiddleware,
  ensureAdm,
  createCategory
);
categoriesRouter.get("", listCategorys);
categoriesRouter.get("/:id/realEstate", listRealEstateCategory);

export default categoriesRouter;
