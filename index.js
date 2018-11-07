// Joi is a package to enforce the validation using schema and object
const Joi = require('joi'); //it return the class so the name is in pascal notation.
//helmet is a package to enhace the http pipeline and add attribute to the http header
const helmet = require('helmet');
//morgan is a package to log the request(type/time-taken/response etc.) on the service
const morgan = require('morgan');
//config is a package to access the config settings from the config files in the app
const config = require('config');
//debug is a package to enable different type of debugging type, you can handle the type from command prompt.
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
//express is a package to streamline the routing and middleware
const express = require('express');

//Project structure - moved the movies related api methods to different file.
const movies = require('./movies');

//Project structure - moved the single PUG html page api method moved to different file. 
const pugPage = require('./myHtmlPage');

//Middleware - adding custome middleware in the request pipeline.
const logger = require('./middleware/logger.js');
const app = express();

//Setting up the api method paths.
app.use('/api/movies',movies);
app.use('/api/myhtml',pugPage);

// Middleware - adding morgan in the express middleware pipeline.
app.use(morgan('tiny'));

//to expose the folder with static pages.
app.use(express.static('public'));

console.log('Application name: ' + config.get('name'));
console.log('Mail server: ' + config.get('mail.host'));
// to set the password in environment variable, execute the set command on command prompt
//e.g. />set app_password=123456
console.log('Your password from the environment variables: ' + config.get('mail.password'));

app.use(express.json());
app.use(helmet());
app.use(logger);
// console.log(app.get('env'));
// console.log(process.env.NODE_ENV);

if(app.get('env')==='stagging'){
    startupDebugger('Starting debugging on stagging environment');
}

function dbWorks(){
    console.log('Inside db function');
}

dbDebugger(setTimeout(
                        //dbWorks
                        () => {console.log('Getting db work done.')}
                        ,1000
                    ));

// setting up the view engine in app, here I am setting up pug as a view engine.
app.set('view engine', 'pug');
//setting up the view filder in app, this is optional setting, by default it is ./views
app.set('views','./views');

app.listen(3000,() => console.log('Listening on port 3000'));