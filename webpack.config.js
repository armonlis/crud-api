import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "production",
  entry: path.join(__dirname, "src/js/main.js"),
  output: {
    path: path.join(__dirname, "dist/"),
    filename: "server.js"
  },
  target: "node",
  plugins: []
};