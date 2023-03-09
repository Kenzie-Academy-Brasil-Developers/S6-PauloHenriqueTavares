import { schedulesSchema } from "../schemas/schedules.schema";
import { z } from "zod";

type ISchedulesSchema = z.infer<typeof schedulesSchema>;

export { ISchedulesSchema };
