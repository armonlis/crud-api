import { stdout } from 'process';
import "dotenv/config";
import createUsersStorage from './db/users.js';
import { IUsersMethods } from './interfaces.js';
import server from "./server.js"

const PORT = process.env.PORT;

try {
  server.listen(PORT ?? 3000, () => stdout.write(`\nThe server was started on the port ${PORT}.\n`));
}
catch(error) {
  stdout.write(`>>>ERROR: ${error.message}.\n`);
};

