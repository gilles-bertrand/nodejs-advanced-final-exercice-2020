const express = require('express');
const hbs = require('express-hbs');
const router = require('./app.router');
const app = express();
//View engine setupr for express HBS
app.engine('hbs',hbs.express4({
    partialsDir :[`${process.cwd()}/views/partials`],
    defaultLayout:`${process.cwd()}/views/layouts/main.hbs`
}))
app.set('view engine','hbs');
app.set('views',`${process.cwd()}/views`);

app.use((req,res,next)=>{
    console.log(req.method, req.url)
    next();
})

app.use(express.static(`${process.cwd()}/public`))

app.use(router);
module.exports = app;