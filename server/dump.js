const fs = require("fs");
const path = require("path");

const input = path.resolve(__dirname, "../tmp/output.sql");
const output = path.resolve(__dirname, "dumpMatchups.json");

fs.readFile(input, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the SQL file:", err);
    return;
  }

  const lines = data.split("\n").filter((line) => line.trim() !== "");
  const heroList = lines.filter((line) => {
    const isHeroId = !isNaN(line[0]) && line[0] !== " ";
    return isHeroId;
  });
  console.log(heroList.length)

  const heroes = {};
  for (let i = 0; i < heroList.length; i++) {
    const heroData = heroList[i].split(/[\s\t]/);

    const heroId = heroData[0];
    const baseWinrate = heroData[1];
    const with_json = JSON.parse(heroData[2]);
    const against_json = JSON.parse(heroData[3]);

    heroes[heroId] = {
      baseWinrate: Number(baseWinrate),
      with: with_json,
      against: against_json,
    };
  }

  fs.writeFile(output, JSON.stringify(heroes), (err) => {
    if (err) {
      console.error("Error writing the JSON file:", err);
      return;
    }
    console.log("Conversion to JSON successful!");
  });
});
