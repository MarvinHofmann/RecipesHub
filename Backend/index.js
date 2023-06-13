// Init Express Server
const express = require("express");
const app = express();
exports.app = app;
const port = 9999;

// Init Body Parser
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// Init Cookie Parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//Init dotenv
const dotenv = require("dotenv");
dotenv.config();

//Init Cors
let cors = require('cors');
app.use(cors({ credentials: true, origin: ['http://localhost:5173', 'http://192.168.0.85:5173', 'http://192.168.0.138'] }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:5173', 'http://192.168.0.85:5173', "http://192.168.0.138");
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

// Import passport config and passport, inizialize it
const passport = require('passport');
const initPPConfig = require("./middleware/passport_config")
initPPConfig();
app.use(passport.initialize())

// Import Routes
const authRoute = require('./routes/auth');
const recipesRoute = require('./routes/recipes');
const userdataRoute = require('./routes/userdata')
const imagesRoute = require('./routes/images')
const shoppingListRoute = require('./routes/shoppingList')
const weekPlanRoute = require('./routes/weekPlan')

// Routes Middleware
app.use('/api/v1/user', authRoute)
app.use('/api/v1/recipes', passport.authenticate('jwt', { session: false }), recipesRoute)
app.use('/api/v1/userdata', passport.authenticate('jwt', { session: false }), userdataRoute)
app.use('/api/v1/images', passport.authenticate('jwt', { session: false }), imagesRoute)
app.use('/api/v1/weekPlan', passport.authenticate('jwt', { session: false }), weekPlanRoute)
app.use('/api/v1/shoppingList', passport.authenticate('jwt', { session: false }), shoppingListRoute)



// Init MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((error) => console.error('Error while Connecting ', error));

//App Listen
app.listen(port, () => {
  console.log(`App running at port ${port}`);
});