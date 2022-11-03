const express = require("express")
const app = express()
require("dotenv").config()
const morgan = require("morgan")
const mongoose = require("mongoose")
const {expressjwt} = require("express-jwt")
const path = require("path")

app.use(express.json())
app.use(express.static(path.join(_dirname, "client", "build")))
app.use(morgan("dev"))


mongoose.connect(process.env.MONGODB_URI, ()=> console.log("Connected to DB"))

const secret = process.env.SECRET || "something different"

app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', expressjwt({ secret, algorithms: ['HS256']}))
app.use('/api/topics', require('./routes/topicsRouter.js'))
app.use('/api/topic/comments', require('./routes/commentsRouter.js'))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "client", "build", "index.html"))
})

const port = process.env.PORT || 9000

app.listen(port, () => {
    console.log('Server is running on local port 9000')
})