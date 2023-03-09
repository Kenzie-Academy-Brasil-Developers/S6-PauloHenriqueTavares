import { Request, Response } from "express";
import { createRealEstateService } from "../services/realEstate/createRealEstate.service";
import { listRealEstatesService } from "../services/realEstate/listRealEstates.service";

const createRealEState = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = req.body;
  const newRealState = await createRealEstateService(data);
  return res.status(201).json(newRealState);
};

const listRealEstates = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const list = await listRealEstatesService();
  return res.status(200).json(list);
};
export { createRealEState, listRealEstates };
