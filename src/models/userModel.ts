import { IUser } from '../models';

const data = [{
  "id": "ajsncck-sads-fsds-sdfsdf",
  "username": "TestName",
  "age": "25",
  "hobbies": [
    "Reading",
    "Writing"
  ]
}];

export const findAll = () => {
  return new Promise((resolve, reject) => {
      resolve(data);
  })
}