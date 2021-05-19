const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;
const dbUrl = 'mongodb+srv://<username>:<password>@webshop-cluster.f7gau.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(dbUrl);

const whitelist = ['http://localhost:3000', 'https://prf-webshop-node.herokuapp.com', 'https://prfwebshop.herokuapp.com',
'http://localhost:4200'];

var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 
    'Origin', 'Accept']
  };

app.use(cors(corsOptions));

mongoose.connection.on('connected', () => {
    console.log('db csatlakoztatva');
})

mongoose.connection.on('error', (err) => {
    console.log('Hiba: ', err);
})

require('./user.model')
require('./stock.model')

const userModel = mongoose.model('user');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({}));


passport.use('local', new localStrategy(function(username, password, done){
    userModel.findOne({username: username}, function(err, user){
        if(err) return done('error', null);
        if(!user) return done('no such username', null);
        user.comparePasswords(password, function(error, isMatch){
            if(error) return done(error, false);
            if(!isMatch) return done('wrong pw', false)
            return done(null, user);
        })
    })
}))

passport.serializeUser(function(user, done){
    if(!user) return done('nincs megadva beleptetheto felhasznalo', null);
    return done(null, user);
})

passport.deserializeUser(function(user, done){
    if(!user) return done('nincs megadva kileptetheto felhasznalo', null);
    return done(null, user);
})

app.use(expressSession({secret: 'titkoskodazexpresssessionhoz', resave: true}));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req, res) => res.render('pages/index'));
app.use('/', require('./routes'));

app.use((req, res, next) => {
    console.log('ez a hibakezelo');
    res.status(404).send('A kert eroforras nem talalhato');
})

app.listen(port, () => {
    console.log('The server is running!');
})