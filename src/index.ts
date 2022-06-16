import * as http from 'http';
import { getAllUsers } from './controlers/userControler.js';

const server = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> => {
  if (req.url === '/api/users' && req.method === 'GET') {
    getAllUsers(req, res);
  }
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});