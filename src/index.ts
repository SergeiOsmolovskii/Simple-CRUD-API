import * as http from 'http';
import { getAllUsers, getUserById, postUser, updateUser } from './controlers/userControler.js';

const server = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> => {
  if (req.url === '/api/users' && req.method === 'GET') {
    getAllUsers(req, res);
  }
  if (req.url === '/api/users' && req.method === 'POST') {
    postUser(req, res);
  }
  if (req.url.match(/\/api\/users\/\w+/) && req.method === 'GET') {
    const id: string = req.url.split('/')[3];
    getUserById(req, res, id);    
  } 
  if (req.url.match(/\/api\/users\/\w+/) && req.method === 'PUT') {
    const id: string = req.url.split('/')[3];
    updateUser(req, res, id);
  }
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});