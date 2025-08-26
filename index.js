import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve .well-known files, except for apple-app-site-association
app.use("/.well-known", express.static(path.join(__dirname, ".well-known"), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith("apple-app-site-association")) {
      res.setHeader("Content-Type", "application/json");
    }
  }
}));

// Explicitly handle apple-app-site-association with correct Content-Type
app.get("/.well-known/apple-app-site-association", (req, res) => {
  console.log("Serving apple-app-site-association"); // Debug log
  res.setHeader("Content-Type", "application/json");
  res.sendFile(path.join(__dirname, ".well-known", "apple-app-site-association"), (err) => {
    if (err) {
      console.error("Error serving AASA file:", err);
      res.status(500).send("Error serving apple-app-site-association");
    }
  });
});

// Fallback: for every other route → launch.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "launch.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
