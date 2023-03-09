import { z } from "zod";
import { adressSchema, realStateSchema } from "../schemas/realEstate.schema";

type IAdressSchema = z.infer<typeof adressSchema>;
type IRealStateSchema = z.infer<typeof realStateSchema>;

interface IAddress {
  numeber?: string | null | undefined;
  street: string;
  zipCode: string;
  city: string;
  state: string;
}

interface IRealState {
  sold?: boolean;
  value: number;
  size: number;
  address: IAddress;
  categoryId: number;
}
interface IRealStateReturn extends IRealState {
  createdAt: Date;
  updatedAt: Date;
}

export {
  IAdressSchema,
  IRealStateSchema,
  IRealState,
  IRealStateReturn,
  IAddress,
};
