const express = require('express');
const app = express();
const db = require('./db'); // Ensure 'db' is correctly configured and imported
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.json());
const port = process.env.PORT || 3000;


app.get('/', function (req, res) {
  res.send('Hello World');
});





const person_router = require('./router/person_router');
app.use('/person', person_router);

const menu_router = require('./router/menu_router');
app.use('/menuItem',menu_router);
app.listen(port, () => {
  console.log("Server is live on port 3000");
});
