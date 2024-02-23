import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import * as dotenv from 'dotenv';
dotenv.config();


const PROJECTNAME = "PixelStats"
const APP = express();
const PORT = process.env.PORT || 3000;

const HYPI = "https://api.hypixel.net/v2/player?uuid=";
const DBPI = "https://playerdb.co/api/player/minecraft/";

const DEFAULTUUID = "f84c6a790a4e45e0879bcd49ebd4c4e2"; // This acts only as a fallback.

const PLAYER_DB_CONFIG = genAPIConfig("playerdb");
const HYPIXEL_KEY = process.env.HYPIXEL_KEY;
const HYPIXEL_CONFIG = genAPIConfig("hypixel", HYPIXEL_KEY);

// Our playerDB calls should have headers like this:
//
// const CONFIG = {
//     headers: {
//         "API-Key": KEY,
//         "user-agent": `github.com/stinkydubeau/${PROJECTNAME}`,
//     }
// }

APP.use(express.static("./public"));
APP.use(bodyParser.urlencoded({ extended: true }));
APP.use(getUUID);
APP.use(getStats);

APP.set('view engine', 'ejs');
APP.set('views', 'views');

// Function to generate API configs dynamically
function genAPIConfig(apiName, apiKey) {
  const headers = {
    "user-agent": `github.com/stinkydubeau/${PROJECTNAME}`,
  };

  if (apiKey) {
    headers["API-key"] = apiKey;
  }

  return {
    headers: headers,
  };
}

function removeUnderscores(str) {
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

function simplifyJSON(original) { // Simplifies hypixel's JSON into something easier to work with.
  try {
    var simplified =
    {
      username: original.player.displayname,
      rank: removeUnderscores(original.player.newPackageRank),
      playtime: original.player.timePlaying,
      firstPlayed: new Date(original.player.firstLogin),
      lastPlayed: new Date(original.player.lastLogout),
    }
    return (simplified);
  }
  catch {
    console.log("There was an error while simplifying the data we received from Hypixel. Try another username?")
    return (original);
  }
}

function validateUUID(uuid) {
  const Pattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4|1][0-9a-fA-F]{3}-[8|9|aA|bB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  if (uuid) {
    if (Pattern.test(uuid)) {
      return uuid; // Minecraft UUID is valid
    } else {
      console.error("Malformed Minecraft UUID. Attempting to fix or using a default UUID.");
      return DEFAULTUUID; // Replace with your logic for fixing or default Minecraft UUID
    }
  } else {
    console.log("No UUID");
  }
}

async function getUUID(req, res, next) {
  if (req.body.username) {
    try {
      var url = DBPI + req.body.username;
      const response = await axios.get(url, PLAYER_DB_CONFIG);
      req.uuid = response.data.data.player.id;
    } catch {
      console.log("Username does not exist! Using default uuid.");
      req.uuid = DEFAULTUUID;
    }
  }
  next();
}

async function getStats(req, res, next) {
  if (req) {
    if (HYPIXEL_KEY) {
      try {
        var url = HYPI + validateUUID(req.uuid);
        var response = await axios.get(url, HYPIXEL_CONFIG);
        if (response.data.player == null) {
          // TODO: Log a user-error in the site rather than defaulting to Herobrine.
          console.log(`${req.uuid} has never joined hypixel. Reverting to default UUID.`);
          url = HYPI + DEFAULTUUID;
          response = await axios.get(url, HYPIXEL_CONFIG);
        }
        req.hypixel = response.data;

        //req.hypixel = response.data.player;
        //return(response)
      } catch {
        console.log(`An error occured while looking up hypixel stats.`);
      }
    } else {
      console.log(`Failed to use key. Is your key ${HYPIXEL_KEY}?`);
    }
  } else {
    console.log("Tried to getStats without specifying user.");
  }
  next();
}

APP.get("/", (req, res) => {
  console.log("Loading \"/\"");
  res.render("index.ejs");
});

APP.post("/userLookup", async (req, res) => {
  var response = req.body.username + "'s user ID is " + req.uuid;
  console.log(response);
  res.render("index.ejs", {
    hypixel: simplifyJSON(req.hypixel),
    uuid: req.uuid,
  });
  //res.redirect("/");
});

APP.listen(PORT, (req, res) => {
  console.log(`Welcome to ${PROJECTNAME}!`);
  console.log(`Using API key:   ${HYPIXEL_KEY}`);
  console.log(`Running on port: ${PORT}`);
});