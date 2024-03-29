import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import * as dotenv from 'dotenv';
dotenv.config();

// Project Settings and Environment Variables
const projectName = "PixelStats"
const fallbackUuid = "f84c6a790a4e45e0879bcd49ebd4c4e2"; // Herobrine
const port = process.env.PORT || 3000;
const hypixelApiKey = process.env.HYPIXEL_KEY;

// API Setup
const hypixeApiUrl = "https://api.hypixel.net/v2/player?uuid=";
const playerDbApiUrl = "https://playerdb.co/api/player/minecraft/";
const playerDbConfig = genAPIConfig("playerdb");
const hypixelApiConfig = genAPIConfig("hypixel", hypixelApiKey);

const app = express();

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(getUUID);
app.use(getStats);

app.set('view engine', 'ejs');
app.set('views', 'views');

// Function to generate API configs dynamically
function genAPIConfig(apiName, apiKey) {
  const headers = {
    "user-agent": `github.com/stinkydubeau/${projectName}`,
  };

  if (apiKey) {
    headers["API-key"] = apiKey;
  }

  return {
    headers: headers,
  };
}

function replaceUnderscoresWithSpaces(str) {
  var newStr = "";
  if (!str) {
    console.log("Cannot remove underscores from empty string!");
    return;
  }
  for (var i = 0; i < str.length; i++) {
    if (str[i] == "_") {
      newStr += " ";
    } else {
      newStr += str[i];
    }
  }
  return (newStr);
}

function getTotalBedwarsGames(data) {
  let sum = 0;
  for (let key in data) {
    if (key.includes("games_played_bedwars")) {
      sum += data[key];
    }
  }
  return sum;
}

function simplifyJSON(original) { // Simplifies hypixel's JSON into something easier to work with.
  try {
    var simplified =
    {
      username: original.player.displayname,
      rank: replaceUnderscoresWithSpaces(original.player.newPackageRank),
      playtime: parseInt(original.player.timePlaying / 60), //hours
      firstPlayed: new Date(original.player.firstLogin),
      lastPlayed: new Date(original.player.lastLogout),
      bedwarsGames: getTotalBedwarsGames(original.player.stats.Bedwars),
      age: parseInt((new Date() - original.player.firstLogin) / (1000 * 60 * 60 * 24 * 365)),
    }
    return (simplified);
  }
  catch {
    console.log("There was an error while simplifying the data we received from Hypixel. Try another username?")
    return (original);
  }
}

async function getUUID(req, res, next) {
  if (req.body.username) {
    try {
      var url = playerDbApiUrl + req.body.username;
      const response = await axios.get(url, playerDbConfig);
      req.uuid = response.data.data.player.id;
    } catch {
      console.log("Username does not exist! Using default uuid.");
      req.uuid = fallbackUuid;
    }
  }
  next();
}

async function getStats(req, res, next) {
  if (req) {
    if (hypixelApiKey) {
      try {
        var url = hypixeApiUrl + req.uuid;
        var response = await axios.get(url, hypixelApiConfig);
        if (response.data.player == null) {
          // TODO: Log a user-error in the site rather than defaulting to Herobrine.
          console.log(`${req.uuid} has never joined hypixel. Reverting to default UUID.`);
          url = hypixeApiUrl + fallbackUuid;
          response = await axios.get(url, hypixelApiConfig);
        } else {
          req.hypixel = response.data;
        }
      } catch {
        console.log(`An error occured while looking up hypixel stats.`);
      }
    } else {
      console.log(`Failed to use key. Is your key ${hypixelApiKey}?`);
    }
  } else {
    console.log("Tried to getStats without specifying user.");
  }
  next();
}

app.get("/", (req, res) => {
  console.log("Loading \"/\"");
  res.render("index.ejs");
});

app.get("/player/:uuid", (req, res) => {
  console.log(req.params.uuid);
  res.redirect("/");
});


app.post("/userLookup", async (req, res) => {
  var response = req.body.username + "'s user ID is " + req.uuid;
  console.log(response);
  if (req.uuid) { // Only load page if there is a valid user to lookup
    res.render("player.ejs", {
      hypixel: simplifyJSON(req.hypixel),
      uuid: req.uuid,
    });
  } else {
    res.redirect("/");
  }
});

app.listen(port, (req, res) => {
  console.log(`Welcome to ${projectName}!`);
  console.log(`Using API key:   ${hypixelApiKey}`);
  console.log(`Running on port: ${port}`);
});