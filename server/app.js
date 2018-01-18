const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
//const cookieParser = require('cookie-parser');
//const passport = require('passport');

const app = express();
app.use(bodyParser.json());

/************************************************************
 **              Load Local Server API files               **
 ************************************************************/
const apiPath = path.resolve(__dirname, 'api');
const apiDir = fs.readdirSync(apiPath);
// Read all api modules from the apiDir
apiDir.forEach(file => {
    // Ignore hidden files (swap files etc)
    if (file.match(/^\./)) return;

    const { router } = require(`./api/${file}`);
    if (router === undefined) return;

    const moduleName = file.split('.')[0];
    app.use(`/api/${moduleName}`, router);
    console.log(`/api/${moduleName}`);
});
// 404 on unknown api-routes
app.get('/api/*', (req, res) => {
    res.status(404).end();
});
/************************************************************/

app.get('favicon.ico', (req, res) => {
    res.status(404).end();
});

/*app.get('/*', (req, res) => {
    const file = path.resolve('', 'index.html');
    res.sendFile(file);
})*/

module.exports = app;