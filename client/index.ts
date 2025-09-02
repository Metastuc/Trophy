import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "dist")));
app.get("*", function (request, response) {
  response.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, function () {
  console.log(`Server is running on http://localhost:${port}`);
});
