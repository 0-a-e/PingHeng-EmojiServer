const express = require("express");
const { Mtoken } = require("./Mtoken.js");
const axios = require('axios');
const app = express();

const port = process.env.PORT || 3000;
let aldata = [];
let sinceId = "";

const getbodydata = (iffirst,id) => {
    let bodydata = "";

    if(iffirst){
        bodydata = JSON.stringify({
            "i":Mtoken,
            "limit":100,
        })

    } else {
        bodydata = JSON.stringify({
            "i":Mtoken,
            "limit":100,
            "sinceId":id
        })
    }
    return bodydata;

}

const gett = async function(bodydata){
    try{
        console.log(bodydata);
        //変えれるようにしたほうがいい？いやMtoken固定だから無理か
        const res = await axios.post('https://msk.seppuku.club/api/admin/emoji/list',bodydata, {
            headers: {'Content-Type': 'application/json'}
          });

        if (res.status != 200) {
            console.log("例外発生時の処理")
         }

            const data = res.data;
            console.log(aldata.length.toString() + " 合計//今回 " + data.length.toString());

            if (data.length != 0) {
                const d = aldata.concat(data);
                aldata = d;
                const lastid = data[data.length - 1]["id"];
                console.log(lastid);
                return lastid;
            } else {
                console.log("==end==");
                return false;
            }
    
    } catch(err) {
    //    console.log(err);
    }
}

app.get("/", async(req, res) => {
    sinceId = await gett(getbodydata(true,false));
    while(true){
        const r = await gett(getbodydata(false,sinceId));
        if(r){
            sinceId = r;
        } else {
            res.status(200).send(aldata);
            break;
        }
    }
    aldata = [];
    sinceId = "";
});

app.listen(port); // appを特定のportでlistenさせる。

console.log("PingHeng Emoji server started on: " + port);