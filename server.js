const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('./auth');
const menu_router = require('./router/menu_router');
const person_router = require('./router/person_router');
const db = require('./db'); 
require('dotenv').config();

// Middleware function to log requests
const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} Request made to: ${req.originalUrl}`);
  next();
};

app.use(bodyParser.json());

// Local Strategy setup


app.use(logRequest);

// Example protected route
app.use(passport.initialize()); // Initialize Passport

const localAuthMiddleWare = passport.authenticate('local', { session: false })
app.get('/', localAuthMiddleWare,(req, res) => {
  res.send('Hello World');
});

// Routers
app.use('/person', person_router);
app.use('/menuItem',localAuthMiddleWare, menu_router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is live on port ${port}`);
});
