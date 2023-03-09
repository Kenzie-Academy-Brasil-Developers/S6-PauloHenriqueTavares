import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/users.controller";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureEmailExits from "../middlewares/ensureEmailIsUnique.middleware";
import ensureAdm from "../middlewares/ensureIsAdm.Middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureUserExitsMidlleware from "../middlewares/ensureUserExists.middleware";
import { userSchema, userUpdateSchema } from "../schemas/user.schema";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchema),
  ensureEmailExits,
  createUser
);
userRoutes.get("", ensureTokenIsValidMiddleware, ensureAdm, getAllUsers);
userRoutes.delete(
  "/:id",
  ensureUserExitsMidlleware,
  ensureTokenIsValidMiddleware,
  ensureAdm,
  deleteUser
);
userRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(userUpdateSchema),
  ensureTokenIsValidMiddleware,
  ensureUserExitsMidlleware,
  updateUser
);

export default userRoutes;
