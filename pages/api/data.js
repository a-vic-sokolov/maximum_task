const Config = require('config-js');
const config = new Config('./config/config.js');
const sqlite = require("aa-sqlite")

export default async function data(req, res) {

    const params = config.configObj.params

    await sqlite.open('./db/data.sqllite3')

    let query = req.body
    if (query == 0) {
        const data  = await sqlite.get("SELECT request FROM request ORDER BY RANDOM() LIMIT 1")
        query = data.request
    }
    else{
        let test  = await sqlite.run("INSERT INTO request (request) values('"+req.body+"')")

    }
    sqlite.close();

    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + params.token,
            "X-Secret": params.secret
        },
        body: JSON.stringify([query])
    }
    const response  = await fetch(params.url, options)
    const data = await response.json()
    res.json(data)
}