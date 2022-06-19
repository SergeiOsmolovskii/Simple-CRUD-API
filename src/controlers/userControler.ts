import * as Users from '../models/userModel.js';
import { IUser, IPossibleUser } from 'models.js';
import { IncomingMessage, ServerResponse } from 'http';
import { getPostUserData } from '../utils.js';
import { checkUUID } from '../utils.js';
import { data } from '../models/userModel.js';

export const getAllUsers = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  try {
    const users: IUser[] = await Users.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Server Error' }));
  }
}

export const postUser = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  try {
    const body: IPossibleUser = await getPostUserData(req);

    if (body.username && body.age && body.hobbies) {
      const newUser: IUser = await Users.createUser(body);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
      process.send(data);
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Does not contain required fields' }));
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Server Error' }));
  }
}

export const getUserById = async (req: IncomingMessage, res: ServerResponse, id: string): Promise<void> => {
  try {
    const user: IUser = await Users.findById(id);

    if (!checkUUID(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid UUID' }));
    } else if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  }
  catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Server Error' }));
  }

}

export const updateUser = async (req: IncomingMessage, res: ServerResponse, id: string): Promise<void> => {

  try {
    const user: IUser = await Users.findById(id);

    if (!checkUUID(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid UUID' }));
    } else if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      const body: IPossibleUser = await getPostUserData(req);
      const { username, age, hobbies } = JSON.parse(JSON.stringify(body));
      const updatedUser: IUser = {
        id: id,
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies
      };

      const newUpdatedUser: IUser = await Users.updateUserByID(id, updatedUser);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUpdatedUser));
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Server Error' }));
  }
}

export const deleteUser = async (req: IncomingMessage, res: ServerResponse, id: string): Promise<void> => {
  try {
    const user: IUser = await Users.findById(id);

    if (!checkUUID(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid UUID' }));
    } else if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      await Users.deleteUserByID(id);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User deleted' }));
      process.send(data);
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Server Error' }));
  }
}