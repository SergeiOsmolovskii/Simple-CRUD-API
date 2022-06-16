import * as Users from '../models/userModel.js';
import { IUser } from 'models.js';
import { IncomingMessage, ServerResponse } from 'http';

export const getAllUsers = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  try {
    const users: IUser[] = await Users.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}