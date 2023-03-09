import { Router } from "express";
import {
  createSchedules,
  listSchedules,
} from "../controllers/schedules.controller";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { schedulesSchema } from "../schemas/schedules.schema";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureAdm from "../middlewares/ensureIsAdm.Middleware";

const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddleware(schedulesSchema),
  createSchedules
);
schedulesRoutes.get(
  "/realEstate/:id",
  ensureTokenIsValidMiddleware,
  ensureAdm,
  listSchedules
);

export default schedulesRoutes;
