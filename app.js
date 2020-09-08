const express = require('express');
const hbs = require('express-hbs');
const bodyParser = require('body-parser');
const router = require('./app.router');
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

app.use(router);
module.exports = app;