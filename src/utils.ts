import { IncomingMessage } from "http";
import { IUser, IPossibleUser } from "models";
import { validate as uuidValidate } from 'uuid';
import { version as uuidVersion } from 'uuid';


export const getPostUserData = (req: IncomingMessage): Promise<IPossibleUser> => {
  return new Promise((res, rej) => {
    try {

      let body = "";

      req.on('data', (data) => {
        body += data.toString();
      });

      req.on('end', () => {
        try {
          res(JSON.parse(body));
        }
        catch (error) {
          rej(error);
        }
      });

    } catch (error) {
      rej(error);
    }
  })
}

export const checkUUID = (id: string): boolean => {
  return uuidValidate(id) && uuidVersion(id) === 4;
}