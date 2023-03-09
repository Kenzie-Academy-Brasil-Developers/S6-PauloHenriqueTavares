import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(3).max(45),
  email: z.string().min(3).max(45).email(),
  admin: z.boolean().optional(),
  password: z.string().min(3).max(120),
});
const userSchemaWithoutAdm = z.object({
  name: z.string().min(3).max(45),
  email: z.string().min(3).max(45).email(),
  password: z.string().min(3).max(120),
});
const userUpdateSchema = userSchemaWithoutAdm.partial();

const userReturnSchema = userSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().optional().nullish(),
  })
  .omit({ password: true });

const returnMultipleUserSchema = userReturnSchema.array();
export {
  userReturnSchema,
  userSchema,
  returnMultipleUserSchema,
  userUpdateSchema,
};
