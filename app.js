const express = require('express');
const mongoose = require('mongoose')
const hbs = require('express-hbs');
const bodyParser = require('body-parser');
const router = require('./app.router');
const passport = require('passport');
const User = mongoose.model('user');
const session = require('express-session');
const sessionStore = new session.MemoryStore;
const expressValidator = require('express-validator');
const { registerHelpers } = require('./helpers/staticgmap');
const app = express();

//View engine setupr for express HBS
app.engine('hbs',hbs.express4({
    partialsDir :[`${process.cwd()}/views/partials`],
    defaultLayout:`${process.cwd()}/views/layouts/main.hbs`
}))
app.set('view engine','hbs');
app.set('views',`${process.cwd()}/views`);

registerHelpers(hbs);

// app.use((req,res,next)=>{
//     console.log(req.method, req.url)
//     next();
// })

app.use(express.static(`${process.cwd()}/public`))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// app.use(expressValidator())

app.use(session({
    store:sessionStore,
    saveUninitialized:true,
    resave:true,
    secret:'secret'
}))

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize())
app.use(passport.session())
app.use((req,res,next)=>{
    res.locals.USER = req.user;
    next();
})

app.use(router);
module.exports = app;