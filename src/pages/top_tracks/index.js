const express = require ('express')
const app = express()
const port = 5000

const CLIENT_ID = "d9f307b6668446e78096051746b9ff21"
const SECRET_ID = "980b6d0c977a40f4a77ccb4535d602b0"
const REDIRECT_URI = "http://localhost:3000/webapp"

app.get('/tracks', (req, res) => {
  res.send('we are here\n');
})