import * as http from 'http';
import { deleteUser, getAllUsers, getUserById, postUser, updateUser } from './controlers/userControler.js';

const server = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> => {
  if (req.url === '/api/users' && req.method === 'GET') {
    getAllUsers(req, res);
  }
  else if (req.url === '/api/users' && req.method === 'POST') {
    postUser(req, res);
  }
  else if (req.url.match(/\/api\/users\/\w+/) && req.method === 'GET') {
    const id: string = req.url.split('/')[3];
    getUserById(req, res, id);    
  } 
  else if (req.url.match(/\/api\/users\/\w+/) && req.method === 'PUT') {
    const id: string = req.url.split('/')[3];
    updateUser(req, res, id);
  }
  else if (req.url.match(/\/api\/users\/\w+/) && req.method === 'DELETE') {
    const id: string = req.url.split('/')[3];
    deleteUser(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});