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

    const finalResponse = jsonFiles.map((file) => readFile(file));

    res.json(finalResponse);
  });
};

function readFile(fileName) {
  const dir = env.DEMO_JSON_DIRECTORY;
  try {
    const data = fs.readFileSync(`${dir}/${fileName}`, 'utf8');
    console.log(data);
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return {};
  }
}

module.exports = {
  getRecentGames,
};
