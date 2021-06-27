const express = require("express");
const { Mtoken } = require("./Mtoken.js");
const axios = require('axios');
const fetch = require('node-fetch');
require('array-foreach-async');
const app = express();

const port = process.env.PORT || 3000;
let aldata = [];
let alldata = [];
let sinceId = "";

const addbase64 = async (d) => {
    await  d.forEachAsync(async function (data, index, d) {
        data["index"] = index;
        await tobase64(data["url"]).then(
            base64data => {
            data["base64"] = base64data;
            alldata.push(data);
            console.log("added");
        });
    });
    console.log("end loop");
    return "ok";
}

const tobase64 = async(url) => {
    const rwd = await fetch(url);
    const bfr = await rwd.buffer();
    const b64 = await bfr.toString('base64');
    return b64;
}


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
            const d = aldata;
            addbase64(d).then(n => {
                res.status(200).send(alldata)
            });
            break;
        }
    }
    aldata = [];
    sinceId = "";
});

app.listen(port); // appを特定のportでlistenさせる。

console.log("PingHeng Emoji server started on: " + port);