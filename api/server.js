const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json());

const mountainRoutes = require('./controllers/mountains');

server.use('/mountains', mountainRoutes)

const port = process.env.PORT || 3000;

server.get('/', (req, res) => res.send("Ready to Climb?"));

module.exports = server;