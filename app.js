require("dotenv").config();
const express = require("express");
const { env } = require("process");
const path = require("path");
const fs = require("fs");
const api = require("./api");

const app = express();
const port = env.PORT || 3001;
const siteDirectory = env.WEBSITE_FOLDER_DIRECTORY;

app.use(express.static(siteDirectory, { extensions: ["css", "js"] }));

// Root url
app.get("/", (req, res) => {
  const indexPath = path.join(siteDirectory, "index.html");

  fs.readFile(indexPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send(`${err}`);
    }

    res.send(data);
  });
});

// Return latest 5 match json files
app.get("/api/recent-match", (req, res) => {
  api.getRecentGames(res);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
