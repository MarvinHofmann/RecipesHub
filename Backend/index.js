// Init Express Server
const express = require("express");
const app = express();
exports.app = app;
const port = 3443;

// Init Body Parser
let bodyParser = require("body-parser");
app.use(bodyParser.json());

// Init Cookie Parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//Init dotenv
const dotenv = require("dotenv");
dotenv.config();

//Init Cors
let cors = require('cors');
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

// Import Routes
const authRoute = require('./routes/auth');
const recipesRoute = require('./routes/recipes');

// Routes Middleware
app.use('/api/user', authRoute)
app.use('/api/recipes', recipesRoute)

// Init MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((error) => console.error('Error while Connecting ', error));

//App Listen
app.listen(port, () => {
  console.log(`App running at port ${port}`);
});