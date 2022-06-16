import { IncomingMessage } from "http";
import { IUser, IPossibleUser } from "models";

export const getPostUserData = (req): Promise<IPossibleUser> => {
  return new Promise((res, rej) => {
    try {

      let body = "";

      req.on('data', (data) => {
        body += data.toString();
      });

      req.on('end', () => {
        res(JSON.parse(body));
      });

    } catch (error) {
      rej(error);
    }
  })
}