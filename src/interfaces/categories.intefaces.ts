import { z } from "zod";
import {
  categoryReturn,
  createCategorySchema,
} from "../schemas/categories.schema";
type ICreateCategory = z.infer<typeof createCategorySchema>;
type ICategoryReturn = z.infer<typeof categoryReturn>;

export { ICreateCategory, ICategoryReturn };
