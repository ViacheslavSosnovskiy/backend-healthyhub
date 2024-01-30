const express = require('express')
require('dotenv').config()

const authRouter = require("./routes/api/auth")

const app = express()
app.use(express.json())

app.use("/api/auth", authRouter)


module.exports = app
