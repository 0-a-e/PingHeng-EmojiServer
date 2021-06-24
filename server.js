const express = require("express");
const { Mtoken } = require("./Mtoken.js");
const request = require('request');

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    //変えれるようにしたほうがいい？いやMtoken固定だから無理か
    console.log(Mtoken);
    request.post({
        url: 'https://msk.seppuku.club/api/admin/emoji/list',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({"i":Mtoken,"limit":100})
    },
     function (error, response, body){
         const data = JSON.parse(body);
        console.log(data[data.length - 1]["id"]);
        res.status(200).send(JSON.stringify(body));
      });
  //  res.status(200).send("Hello World");
});

app.listen(port); // appを特定のportでlistenさせる。

console.log("PingHeng Emoji server started on: " + port);