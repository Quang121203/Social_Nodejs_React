const express = require('express');
const router = require('./router.js');
const path = require('path');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');
const socket = require('./socket');
require('dotenv').config();

const app = express()

const io = new Server({
  cors: {
    origin: "http://localhost:3000"
  }
});

io.listen(8081);

app.use("/images", express.static(path.join(__dirname, '../public')));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

const port = process.env.port;

//set up req.body
app.use(express.json());

app.use(cookieParser());

app.use('/api', router)

socket(io);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})





