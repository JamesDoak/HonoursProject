// Name:        James Alexander Doak
// Project:     Coursework 2 - WPD2
// File:        index.js
// Deadline:    17/03/2021 @ midnight.
// Submitted:   {{ insert }}

// Description: This is my coursework project for my Web Platform Development 2 module (M3I322955-20-B)
//              which looks to see me implement a basic prototype of a personal fitness planner.

// Begin index here -------------------------------------------------------------------------------------------------------------------------------------------------



// import the express framework
    const express = require('express');
// import the path module
    const path = require('path');
// use express to create a web application.
    const app = express();
// set the public directory for relevant files.
    const public = path.join(__dirname, 'public');
//import the mustache module
    const mustache = require('mustache-express');
//import the body parser module
    const bodyParser = require('body-parser');
//import the auth module
    const auth = require('./auth/auth');
// import the session module
    const session = require('express-session');
//import the passport module
    const passport = require('passport');

// //import the dayjs module
//     const dayjs = require('dayjs');
//     dayjs().format(Date(), 'DD MM YYYY');
//     var customParseFormat = require('dayjs/plugin/customParseFormat')
//     dayjs.extend(customParseFormat)

//instruct application to use body parser module
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({ secret: 'dont tell anyone', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
auth.init();


//set the server port
const PORT = process.env.PORT || 4000;



// const { JSDOM } = require( "jsdom" );
// const { window } = new JSDOM( "" );
// const $ = require( "jquery" )( window );



// set the javascript directory
    const javascript = path.join(__dirname, 'javascript');
// instruct express to use the server side JS folder
app.use(express.static(javascript));

// create and register a mustache engine and template
app.engine('mustache', mustache());
app.set('view engine', 'mustache');


// instruct express to use the public folder for static resources.
app.use(express.static(public));

//import the new router and map it to all requests
const router = require('./routes/plannerRoutes');
const { authenticate } = require('passport');
app.use('/', router);

// start a server on localhost:4000 - control + c will quit the application.
app.listen(PORT, function() {
    console.log(`The application server has been started on port ${PORT} - localhost:${PORT} - Use "Ctrl + c" to close and quit.`);
})

//comment - to test GIT push in VSCode.