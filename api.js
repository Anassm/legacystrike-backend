const fs = require("fs");
const { env } = require("process");

// Endpoint - Return most recent 5 parsed demo files.
const getRecentGames = (res) => {
  const fileDirectory = env.DEMO_DIRECTORY;

  fs.readdir(fileDirectory, (err, files) => {
    if (err) {
      return res.status(500).send(`${err}`);
    }

    const jsonFiles = files.filter((file) => file.endsWith(".json"));

    const recentJsonFiles = jsonFiles.slice(-5);

    const finalResponse = recentJsonFiles.map((file) => readFile(file));

    res.json(finalResponse);
  });
};

function readFile(fileName) {
  const dir = env.DEMO_DIRECTORY;
  try {
    const data = fs.readFileSync(`${dir}/${fileName}`, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return {};
  }
}

module.exports = {
  getRecentGames,
};
