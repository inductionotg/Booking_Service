const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const {PORT, FLIGHT_SERVICE_PATH} = require('./config/server-config')

const apiRoutes = require('./routes/index');
const db = require('./models/index')
const BookingRepository = require('./repository/index')
console.log(BookingRepository)


const setupAndStartServer=()=>{
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))

    app.use('/api',apiRoutes)
    app.listen(PORT,async()=>{
        console.log("Sever started",PORT)
        console.log(FLIGHT_SERVICE_PATH)
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true})
        }
    })
}
setupAndStartServer()