import { Response, Request } from "express";
import { User } from "../entities";
import createUserService from "../services/users/createUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { listUsersService } from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUsers.service";

const createUser = async (req: Request, res: Response) => {
  const userData: User = req.body;
  const newUser = await createUserService(userData);
  return res.status(201).json(newUser);
};
const getAllUsers = async (req: Request, res: Response) => {
  const users = await listUsersService();
  return res.json(users);
};
const deleteUser = async (req: Request, res: Response) => {
  await deleteUserService(parseInt(req.params.id));
  return res.status(204).send();
};
const updateUser = async (req: Request, res: Response) => {
  const isAdm = req.user;
  const userData: User = req.body;
  const idUser: number = parseInt(req.params.id);
  const updateUser = await updateUserService(userData, idUser, isAdm);
  return res.status(200).send(updateUser);
};

export { createUser, getAllUsers, deleteUser, updateUser };
