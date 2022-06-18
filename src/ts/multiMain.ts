import cluster from "cluster";
import { cpus } from "os";
import server from "./server.js";
import { stdout, pid } from "process";
import "dotenv/config";

const PORT = process.env.PORT || 5000;
const cpuNum = cpus().length;

if (cluster.isPrimary) {
  stdout.write(`\nMaster ${pid} started.\n`)  
  for (let i = 0; i < cpuNum; i += 1) {
    cluster.fork();
  };
  cluster.on("exit", (worker, code) => {
    stdout.write(`Worker ${worker.id} finished with code ${code}`);
    server.listen(PORT, () => stdout.write(`\nWorker ${pid} was started.\n`));
  });
} else {
  server.listen(PORT, () => stdout.write(`\nWorker ${pid} was started.\n`));
};