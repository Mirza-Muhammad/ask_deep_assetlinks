import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve .well-known files
app.use("/.well-known", express.static(path.join(__dirname, ".well-known")));

// Example: keep API root JSON
// app.get("/", (req, res) => {
//   res.json({ message: "server route hit!" });
// });


// Fallback: for every other route → launch.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "launch.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
