import { IUser, IPossibleUser } from 'models.js';
import { v4 as uuidv4 } from 'uuid';

export let data: IUser[] = [];

export const findAll = async (): Promise<IUser[]> => {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
}

export const createUser = async (users: IPossibleUser): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    const newUser = {id: uuidv4(), ...users};
    data.push(newUser);
    resolve(newUser);
  });
}

export const findById = async (id: string): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    const user = data.find(user => user.id === id);
    resolve(user);
  });
}

export const updateUserByID = async (id: string, user: IPossibleUser): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    const userIndex = data.findIndex(user => user.id === id);
    user[userIndex] = {id, ...user};
    data[userIndex] = user[userIndex];
    resolve(user[userIndex]);
  });
}

export const deleteUserByID = async (id: string): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    const userIndex = data.findIndex(user => user.id === id);
    const user = data[userIndex];
    data.splice(userIndex, 1);
    resolve(user);
  });
}