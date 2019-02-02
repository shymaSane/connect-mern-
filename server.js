const express = require('express')
const app = express()
const port = process.env.PORT || 5000 

app.get('/', (req, res) => {
    res.send('working')
})

app.listen(port, () => {
    console.log(`server working on port: ${port}`)
})