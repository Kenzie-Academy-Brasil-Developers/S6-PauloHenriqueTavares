import { z } from "zod";

const adressSchema = z.object({
  street: z.string().min(3).max(45),
  zipCode: z.string().max(8),
  number: z.string().nullish(),
  city: z.string().max(20),
  state: z.string().max(2),
});

const realStateSchema = z.object({
  value: z.number().or(z.string()),
  size: z.number().int().positive(),
  address: adressSchema,
  categoryId: z.number(),
});
export { adressSchema, realStateSchema };
