var express = require('express')
var app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://heroku_58zm16gw:v3qpmmgbeg8a5a9huthfs01t5q@ds033877.mlab.com:33877/heroku_58zm16gw',
    { useNewUrlParser: true, useUnifiedTopology: true})

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
require('./controllers/quizzes.controller.server')(app)
require('./controllers/questions.controller.server')(app)
require('./controllers/quiz-attempts.controller.server')(app)

let connectionString = 'mongodb://127.0.0.1:27017/test';
if(process.env.MLAB_USERNAME_WEBDEV) {
    let username = process.env.MLAB_USERNAME_WEBDEV;
    let password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds033877.mlab.com:33877/heroku_58zm16gw';
    // mongodb://heroku_58zm16gw:v3qpmmgbeg8a5a9huthfs01t5q@ds033877.mlab.com:33877/heroku_58zm16gw
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
