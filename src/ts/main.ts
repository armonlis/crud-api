import { stdout } from 'process';
import { createServer } from "http";
import "dotenv/config";

const PORT = process.env.PORT;

const server = createServer();

server.listen(PORT, () => stdout.write(`The server was started on the port ${PORT}.`))
