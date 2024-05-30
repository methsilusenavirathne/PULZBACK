const express = require('express')
const app = express()
require('dotenv/config')
const bodyParser = require('body-parser')
const db = require('./utils/db')
const cors = require("cors");

const PORT = process.env.PORT || 5000 

const userRoutes = require('./routes/user.routes')

db.connect()
    .then(() => {
        console.log("Database Connected!");
    })
    .catch(console.log);
 
app.use(
    cors({
        origin: "*",
        optionsSuccessStatus: 200,
    })
);    
    
app.use(bodyParser.json())

app.use('/v1/api/user',userRoutes)

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})