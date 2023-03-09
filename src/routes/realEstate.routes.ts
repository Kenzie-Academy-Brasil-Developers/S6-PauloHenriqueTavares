import { Router } from "express";
import {
  createRealEState,
  listRealEstates,
} from "../controllers/realEstate.controller";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureAdm from "../middlewares/ensureIsAdm.Middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import { realStateSchema } from "../schemas/realEstate.schema";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  ensureDataIsValidMiddleware(realStateSchema),
  ensureTokenIsValidMiddleware,
  ensureAdm,
  createRealEState
);
realEstateRoutes.get("", listRealEstates);
export default realEstateRoutes;
