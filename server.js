var express = require("express");
const { Mtoken } = require("./Mtoken.js");
var app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    console.log(Mtoken);
    res.status(200).send("Hello World");
});

app.listen(port); // appを特定のportでlistenさせる。

console.log("PingHeng Emoji server started on: " + port);