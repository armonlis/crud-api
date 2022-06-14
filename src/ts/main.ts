import { stdout } from 'process';
import { createServer } from "http";
import "dotenv/config";
import requestHandler from './handlers/requestHandler.js';
import createUsersStorage from './db/users.js';
import { IUsersMethods } from './interfaces.js';

const PORT = process.env.PORT;

let usersStorage: IUsersMethods;

try {
  stdout.write("\nStarting server...\n");
  usersStorage = createUsersStorage();
  const server = createServer((req, res) => {
    const { status, statusMes, data } = requestHandler(req);
    res.statusCode = status;
    res.statusMessage = statusMes ?? "";
    if (data) { res.setHeader("Content-type", "aplication/json") }
    res.end(data ? JSON.stringify(data) : "");
  });

  server.listen(PORT ?? 3000, () => stdout.write(`\nThe server was started on the port ${PORT}.\n`))
}
catch(error) {
  stdout.write(`>>>ERROR: ${error.message}.\n`);
};

export  { usersStorage };