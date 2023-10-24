const fs = require("fs");
const { env } = require("process");

// Endpoint - Return most recent 5 parsed demo files.
const getRecentGames = (res) => {
  const fileDirectory = env.DEMO_JSON_DIRECTORY;

  fs.readdir(fileDirectory, (err, files) => {
    if (err) {
      return res.status(500).send(`${err}`);
    }

    const jsonFiles = files.slice(-5);

    res.json(jsonFiles);
  });
};

module.exports = {
  getRecentGames,
};
