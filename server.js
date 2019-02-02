const express = require('express')
const app = express()
const port = process.env.PORT || 5000 

const users = require('./routers/users')
const profiles = require('./routers/profiles')
const stories = require('./routers/stories')

app.get('/', (req, res) => {
    res.send('working')
})

app.use('/api/users', users)
app.use('/api/profiles', profiles)
app.use('/api/stories', stories)


app.listen(port, () => {
    console.log(`server working on port: ${port}`)
})