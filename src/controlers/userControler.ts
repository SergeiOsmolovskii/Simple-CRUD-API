import * as Users from '../models/userModel.js';
import { IUser, IPossibleUser } from 'models.js';
import { IncomingMessage, ServerResponse } from 'http';
import { getPostUserData } from '../utils.js';

export const getAllUsers = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  try {
    const users: IUser[] = await Users.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

export const postUser = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  try {
    const body = await getPostUserData(req);
    const newUser: IUser = await Users.createUser(body);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));

  } catch (error) {
    console.log(error);
  }
}