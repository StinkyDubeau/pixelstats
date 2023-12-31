import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import fs from "node:fs";

const PROJECTNAME = "PixelStats"
const APP  = express();
const PORT = 3000;
const KEYPATH = "apikeys.txt";

const HYPI = "https://api.hypixel.net/v2/player?uuid=";
const DBPI = "https://playerdb.co/api/player/minecraft/";

const DEFAULTUUID = "f84c6a790a4e45e0879bcd49ebd4c4e2"; // This acts only as a fallback.

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

const PLAYER_DB_CONFIG = genAPIConfig("playerdb");
const HYPIXEL_KEY = getKey(KEYPATH);
const HYPIXEL_CONFIG = genAPIConfig("hypixel", HYPIXEL_KEY);

// const CONFIG = {
//     headers: {
//         "API-Key": KEY,
//         "user-agent": `github.com/stinkydubeau/${PROJECTNAME}`,
//     }
// }

APP.use(express.static("./public"));
APP.use(bodyParser.urlencoded({extended: true}));
APP.use(getUUID);
APP.use(getStats);

function getKey(path){ // Returns text from 'path'. Creates 'path' if it doesn't exist.
  var key;
  var needKeyMsg = '- You have not inserted your API key into apikeys.txt. The app will not work until you do. -'
  try {
    const data = fs.readFileSync(path, 'utf8');
    key = data;
  }
      catch (err) {
    try{
      fs.writeFile(path, needKeyMsg, (err) => {
        if (err) throw err;
        console.log(`${path} has been created. Please paste your API key inside.`);
      });
    } catch(err){
      console.error(`Create ${path} and paste your API key inside.`);
    }
  }
  return key;
}

function removeUnderscores(str){
  var newStr = "";
  if(!str){
    console.log("Cannot remove underscores from empty string!");
    return;
  }
  for(var i = 0; i < str.length; i++){
    if(str[i] == "_"){
      newStr += " ";
    }else{
      newStr += str[i];
    }
  }
  return(newStr);
}

function translateJSON(original){ // Converts hypixel's JSON into something easier to work with.
  var translated = 
    {
    username: original.player.displayname,
    rank: removeUnderscores(original.player.newPackageRank),
    playtime: original.player.timePlaying,
    firstPlayed: new Date(original.player.firstLogin),
    lastPlayed: new Date(original.player.lastLogout),
  }
  return(translated);
}

function validateUUID(uuid) {
    const Pattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4|1][0-9a-fA-F]{3}-[8|9|aA|bB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

    if (Pattern.test(uuid)) {
        return uuid; // Minecraft UUID is valid
    } else {
        console.error("Malformed Minecraft UUID. Attempting to fix or using a default UUID.");
        return DEFAULTUUID; // Replace with your logic for fixing or default Minecraft UUID
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
    }catch{
      console.log(`An error occured while looking up hypixel stats.`);
    }
  }else{
    console.log(`You need to define an API key in ${KEYPATH}.`);
  }
  next();
}

APP.get("/", (req, res) => {
  console.log("Loading home...");
  res.render("index.ejs");
});

APP.post("/userLookup", async (req, res) => {
  var response = req.body.username + "'s user ID is " + req.uuid;
  console.log(response);
  res.render("index.ejs", {
    hypixel: translateJSON(req.hypixel)
  });
  //res.redirect("/");
});

APP.listen(PORT, (req, res) => {
  console.log(`Welcome to ${PROJECTNAME}!`);
  console.log(`Using API key:   ${HYPIXEL_KEY}`);
  console.log(`Running on port: ${PORT}`);
});