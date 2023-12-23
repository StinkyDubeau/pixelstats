import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import fs from "node:fs";

const APP  = express();
const PORT = 3000;
const KEYPATH = "apikeys.txt";
const KEY = getKey();

function getKey(){ // Returns text from KEYPATH. Creates KEYPATH if it doesn't exist.
    var key;
    var needKeyMsg = '- You have not inserted your API key into apikeys.txt. The app will not work until you do. -'
    try {
        const data = fs.readFileSync(KEYPATH, 'utf8');
        console.log(data);
        key = data;
      }
      catch (err) {
        try{
            fs.writeFile(KEYPATH, needKeyMsg, (err) => {
                if (err) throw err;
                console.log(`${KEYPATH} has been created. Please paste your API key inside.`);
              });
        } catch(err){
            console.error(`Create ${KEYPATH} and paste your API key inside.`);
        }
      }
    return key;
}

APP.use(express.static("./public"));

APP.get("/", (req, res) => {
    res.render("index.ejs");
});

APP.listen(PORT, (req, res) => {
    console.log(`App is running on port ${PORT}`)
});