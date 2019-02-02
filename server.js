const express = require('express')
const mongoose  = require('mongoose')
const app = express()
const port = process.env.PORT || 5000 

//@routes
const users = require('./routers/users')
const profiles = require('./routers/profiles')
const stories = require('./routers/stories')

//@connect monogo
mongoose
    .connect('mongodb://connect:shymaSane1@ds159634.mlab.com:59634/connect',  { useNewUrlParser: true })
    .then(() => console.log('mongoose connected'))
    .catch((err) => console.log('mongoose didnt connect err:' + err))

app.get('/', (req, res) => {
    res.send('working')
})

//@using routes
app.use('/api/users', users)
app.use('/api/profiles', profiles)
app.use('/api/stories', stories)


app.listen(port, () => {
    console.log(`server working on port: ${port}`)
})