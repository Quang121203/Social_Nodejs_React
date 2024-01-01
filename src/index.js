const express = require('express')
require('dotenv').config();
const router = require('./router.js')

const app = express()
const port = process.env.port;

//set up req.body
app.use(express.json());

app.use('/api', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



