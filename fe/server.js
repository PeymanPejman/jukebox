const PORT = process.env.PORT
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!\n')
})

app.listen(PORT, function () {
  console.log('Jukebox is running on port ' + PORT)
})
