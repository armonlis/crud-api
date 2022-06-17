import { createServer } from "http";
import requestHandler from './handlers/requestHandler.js';
import createUsersStorage from './db/users.js';
import { stdout } from "process";

stdout.write("\nStarting server...\n");

export const usersStorage = createUsersStorage();

const server = createServer((req, res) => {
    const { status, statusMes, data, sendRes } = requestHandler(req, res);
    if (!sendRes) {
      return;
    };
    res.statusCode = status;
    res.statusMessage = statusMes ?? "";
    if (data) { res.setHeader("Content-type", "aplication/json") }
    res.end(data ? JSON.stringify(data) : "");
  });

export default server;