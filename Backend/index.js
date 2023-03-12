// Init Express Server
const express = require("express");
const app = express();
exports.app = app;
const port = 3443;

// Init Body Parser
let bodyParser = require("body-parser");
app.use(bodyParser.json());

//Init dotenv
const dotenv = require("dotenv");
dotenv.config();

//Init Cors
let cors = require('cors');
app.options('*', cors())
app.use(cors())

// Import Routes
const authRoute = require('./routes/auth');

// Routes Middleware
app.use('/api/user', authRoute)

// Init MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((error) => console.error('Error while Connecting ', error));

//App Listen
app.listen(port, () => {
  console.log(`App running at port ${port}`);
});