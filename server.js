const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const {expressjwt} = require("express-jwt")
const path = require("path")
const process = require('process');

require("dotenv").config

app.use(express.static("./client/build"))
app.use(express.json())
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, 'client', 'build')));


mongoose.connect(process.env.MONGODB_URI, ()=> console.log("Connected to DB"))

const secret = process.env.SECRET || "something different"

app.use('/auth', require(path.join(__dirname,'routes','authRouter.js')))
app.use('/api', expressjwt({ secret, algorithms: ['HS256']}))
app.use('/api/topics', require(path.join(__dirname,'routes','topicsRouter.js')))
app.use('/api/topic/comments', require(path.join(__dirname,'routes','commentsRouter.js')))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
})

const port = process.env.PORT || 9000

app.listen(port, () => {
    console.log('Server is running on local port 9000')
})