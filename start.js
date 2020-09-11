const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 10 || major === 10 && minor <= 2) {
    console.log('The node version of the server is too low for modern node programming')
    throw ('The node version of the server is too low for modern node programming')
}
//inititalize env variables
require('dotenv').config({ path: '.variables.env' });

// Async initialization of my server

const initServer = async () => {
    //Launch Mongo Connection
    const mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    try {
        await mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Mongo is now connected to your app')
        mongoose.set('debug', true);
    } catch (err) {
        if (err) throw err;
    }

    //Load all models from mongoose
    require(`${process.cwd()}/models/store`);
    require(`${process.cwd()}/models/review`);
    require(`${process.cwd()}/models/user`);


    //Start our app if everything is allright and running
    const app = require(`${process.cwd()}/app`);
    app.set('port', process.env.PORT || 8001);
    const server = app.listen(app.get('port'), () => {
        console.log(`express running - PORT ${server.address().port}`)
    })
}
initServer();

