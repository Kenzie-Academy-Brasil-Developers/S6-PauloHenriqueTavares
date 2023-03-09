import { Request, Response } from "express";
import { ISchedulesSchema } from "../interfaces/schedules.interfaces";
import createSchedulesService from "../services/schedules/createSchedules.service";
import { listSchedulesService } from "../services/schedules/listSchedules.service";

const createSchedules = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: ISchedulesSchema = req.body;
  const id: number = req.user.id;
  const newSchedule = await createSchedulesService(data, id);
  return res.status(201).json(newSchedule);
};
const listSchedules = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const allSchedules = await listSchedulesService(id);
  return res.json(allSchedules);
};
export { createSchedules, listSchedules };
