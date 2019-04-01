//config local variables
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose');
const logger = require('morgan')
const bodyParser = require('body-parser')

// const mongoose  = require('mongoose')
const app = express()

//parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const environment = process.env.NODE_ENV 
const stage = require('./config')[environment]

//@routes
const routes = require('./routes/index')

// @connect monogo
mongoose
    .connect(`${process.env.DB_URI}`,  {useCreateIndex: true, useNewUrlParser: true })
    .then(() => console.log('mongoose connected'))
    .catch((err) => console.log('mongoose didnt connect err:' + err))

app.get('/', (req, res) => {
    res.send('working')
})

//@using routes
app.use('/api/user', routes.user)
app.use('/api/profile', routes.profile)
app.use('/api/story', routes.story)

app.listen(`${stage.port}`, () => {
    console.log(`server working on port: ${stage.port}`)
})