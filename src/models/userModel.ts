import * as path from 'path';
import * as fs from "fs/promises";
import { IUser } from 'models.js';

const dataPath = './src/data/data.json';

const data: IUser[] = JSON.parse(await fs.readFile(path.join(dataPath), 'utf8'));

export const findAll = async (): Promise<IUser[]> => {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
}