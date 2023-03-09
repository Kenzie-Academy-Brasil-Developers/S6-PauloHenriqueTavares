import { z } from "zod";
import {
  returnMultipleUserSchema,
  userReturnSchema,
  userSchema,
  userUpdateSchema,
} from "../schemas/user.schema";

type IUser = z.infer<typeof userSchema>;
type IUserReturn = z.infer<typeof userReturnSchema>;
type IArrUserReturn = z.infer<typeof returnMultipleUserSchema>;
type IUserUpdate = z.infer<typeof userUpdateSchema>;
export { IUser, IUserReturn, IArrUserReturn, IUserUpdate };
