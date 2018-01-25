// TODO: Cookies (passport)
// TODO: Database (sequelize)
// TODO: Facebook API
// TODO: NEM integration/NEM wallet/multisignature. (nem-sdk)
const { networkId, endpoint } = require('./config/nemconfig');
const crypto = require('./api/crypto');
const wallet = require('./api/wallet');
const nem = require('nem-sdk').default;
//const app = require('./app');

// sub (live-update using sockets) -> Visually see new transactions coming in without ...

const privateKey = '0a6c1a0f82452b07a56631f573cc70c58c55e488e11fb0f16b2bf0eec3b0b3e0';
const recipient = 'TCPA4OHH5WGZQ6PDZLOZG5G2LTVTMZE3XOQNMB6T';

const db = require('./models');
const debug = require('./debug');


async function main() {
    dbWallet = await wallet.createNewWallet('TobiasWallet', 'yolo'); //?
    common = await wallet.decryptWallet(dbWallet, 'yolo')
    console.log(common);
}


// Start DB
db.sequelize.sync({ force: true }).then(async () => {
    await debug.createDebugModels();
    main();
})

// TODO : Create wallet or import wallet
// TODO : Select default wallet/account for sending/receiving.
// TODO : Send/Request funds from facebook friends that have signed up.

// TODO? : Trezor support (as a third option to creating/importing wallet)


/* Listen for http requests
const portNumber = 8080;
app.listen(portNumber, () => {
    console.log(`================================================`);
    console.log(`nem-social-wallet server listening on port ${portNumber}!`);
    console.log(`================================================`);
});
//*/