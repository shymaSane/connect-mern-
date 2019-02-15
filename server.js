//config local variables
require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const mongoose  = require('mongoose')
const app = express()

const environment = process.env.NODE_ENV 
const stage = require('./config')[environment]


//@routes
const users = require('./routers/users')
const profiles = require('./routers/profiles')
const stories = require('./routers/stories')

//@connect monogo
mongoose
    .connect(process.env.DB_URI,  { useNewUrlParser: true })
    .then(() => console.log('mongoose connected'))
    .catch((err) => console.log('mongoose didnt connect err:' + err))

app.get('/', (req, res) => {
    res.send('working')
})

//@using routes
app.use('/api/users', users)
app.use('/api/profiles', profiles)
app.use('/api/stories', stories)


app.listen(`${stage.port}`, () => {
    console.log(`server working on port: ${stage.port}`)
})