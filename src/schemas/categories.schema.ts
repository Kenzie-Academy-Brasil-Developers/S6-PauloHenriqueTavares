import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string().min(3).max(45),
});

const categoryReturn = createCategorySchema.extend({
  id: z.number(),
});
export { createCategorySchema, categoryReturn };
