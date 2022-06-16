import { IUser } from 'models.js';
import { v4 as uuidv4 } from 'uuid';

const data: IUser[] = [];

export const findAll = async (): Promise<IUser[]> => {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
}

export const createUser = async (users): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    const newUser = {id: uuidv4(), ...users};
    data.push(newUser);
    resolve(newUser);
  });
}