const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const {PORT} = require('./config/server-config')
const setupAndStartServer=()=>{
    app.listen(PORT,async()=>{
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended:true}))
        console.log("Sever started",PORT)
    })
}
setupAndStartServer()