import * as http  from 'http';
import { findAll } from './models/userModel';


const server = http.createServer( async (req, res) => {
  if (req.url === 'api/users' && req.method === 'GET') {

    const users = await findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  }
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});