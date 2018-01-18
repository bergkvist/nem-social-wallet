// TODO: Cookies (passport)
// TODO: Database (sequelize)
// TODO: Facebook API
// TODO: NEM integration/NEM wallet/multisignature. (nem-sdk)

const app = require('./app');
const nis = require('./nis');
const nem = require('nem-sdk').default;
const { generateKeyPair } = require('./api/crypto');

nis.get.status() //?

//createSignedTransaction(secretKey) //?

/*
// Listen for http requests
const portNumber = 8080;
app.listen(portNumber, () => {
    console.log(`================================================`);
    console.log(`nem-social-wallet server listening on port ${portNumber}!`);
    console.log(`================================================`);
});
*/