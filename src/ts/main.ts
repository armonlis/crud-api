import { stdout } from 'process';
import { createServer } from "http";
import "dotenv/config";

const PORT = process.env.PORT;

const server = createServer();

server.listen(PORT, () => stdout.write(`\nThe server was started on the port ${PORT}.\n`))
