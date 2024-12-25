// app.js
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session'); // Import express-session

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);
app.use(cookieParser('CookingBlogSecure'));

// Set up session management
app.use(session({
  secret: 'your_secret_key', // Change this to a secure random string
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);

app.listen(port, () => console.log(`Listening to port ${port}`));