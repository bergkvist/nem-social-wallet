const express = require('express');
const bodyParser = require('body-parser');
const portNumber = 8080;
const app = express();
app.use(bodyParser.json());

// TODO: Cookies (passport)
// TODO: Database (sequelize)
// TODO: Facebook API
// TODO: NEM integration/NEM wallet/multisignature. (nem-sdk)

app.get('/', (req, res) => {
    res.send("<h1>Main site</h1>");
});

// Listen for http requests
app.listen(portNumber, () => {
    console.log(`================================================`);
    console.log(`nem-social-wallet server listening on port ${portNumber}!`);
    console.log(`================================================`);
});
