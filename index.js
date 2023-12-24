import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import fs from "node:fs";

const PROJECTNAME = "PixelStats"
const APP  = express();
const PORT = 3000;
const KEYPATH = "apikeys.txt";
const KEY = getKey(KEYPATH);

const HYPI = "https://api.hypixel.net/v2/";
const DBPI = "https://playerdb.co/api/player/minecraft/";

const DEFAULTUUID = "02e5af78-1e91-4c28-bb2b-937950c4d3f3"; // This acts only as a fallback.

const CONFIG = {
    "title": PROJECTNAME,
    "user-agent": `github.com/stinkydubeau/${PROJECTNAME}`,
}

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

APP.use(express.static("./public"));
APP.use(bodyParser.urlencoded({extended: true}));
APP.use(getUUID);

async function getUUID(req, res, next){
    if(req.body.username){
        try{
        var url = DBPI + req.body.username;
        var response = await axios.get(url);
        req.uuid = response.data.data.player.id;
        }catch{
            console.log("Username does not exist! Using default uuid.");
            req.uuid = DEFAULTUUID;
        }        
    }
    next();
}

APP.get("/", (req, res) => {
    res.render("index.ejs");
});

APP.post("/submitPlayer", async (req, res) => {   
    console.log(req.body.username + "'s user ID is " + req.uuid);
    res.redirect("/");
});

APP.listen(PORT, (req, res) => {
    console.log(`Welcome to ${PROJECTNAME}!`);
    console.log(`Using API key:   ${KEY}`);
    console.log(`Running on port: ${PORT}`);
});