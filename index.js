import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import fs from "node:fs";

const PROJECTNAME = "PixelStats"
const APP  = express();
const PORT = 3000;
const KEYPATH = "apikeys.txt";
const KEY = getKey(KEYPATH);

const HYPI = "https://api.hypixel.net/v2/player?uuid=";
const DBPI = "https://playerdb.co/api/player/minecraft/";

const DEFAULTUUID = "f84c6a790a4e45e0879bcd49ebd4c4e2"; // This acts only as a fallback.

const CONFIG = {
    headers: {
        "API-Key": KEY,
        "user-agent": `github.com/stinkydubeau/${PROJECTNAME}`,
    }
}

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

async function getUUID(req, res, next){
    if(req.body.username){
        try{
            var url = DBPI + req.body.username;
            const response = await axios.get(url, CONFIG);
            req.uuid = response.data.data.player.id;
        }catch{
            console.log("Username does not exist! Using default uuid.");
            req.uuid = DEFAULTUUID;
        }        
    }
    next();
}

async function getStats(req, res, next){
    if(KEY){
        try{
            var url = HYPI + req.uuid;
            var response = await axios.get(url, CONFIG);
            if(response.data.player == null){
                // TODO: Log a user-error in the site rather than defaulting to Herobrine.
                console.log(`${req.uuid} has never joined hypixel. Reverting to default UUID.`);
                url = HYPI + DEFAULTUUID;
                response = await axios.get(url, CONFIG);
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
    console.log(`Using API key:   ${KEY}`);
    console.log(`Running on port: ${PORT}`);
});