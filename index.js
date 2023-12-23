import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const APP  = express();
const PORT = 3000;

APP.use(express.static("./public"));

APP.get("/", (req, res) => {
    res.render("index.ejs");
});

APP.listen(PORT, (req, res) => {
    console.log("App is running on port " + PORT)
});