const nem = require('nem-sdk').default;
const { networkId, endpoint } = require('../config/nemconfig');
const db = require('../models');


async function createPrivateKeyWallet(walletName, walletPassword, privateKey) {
    const nemWallet = await nem.model.wallet
        .importPrivateKey(walletName, password, privateKey, networkId);

    return saveNewWallet(nemWallet, walletPassword);
}

async function createNewWallet(walletName, walletPassword) {
    const nemWallet = await nem.model.wallet
        .createPRNG(walletName, walletPassword, networkId);

    return saveNewWallet(nemWallet, walletPassword);
}

async function saveNewWallet(nemWallet, walletPassword) {
    const walletName = nemWallet.name;
    const dbWallet = await db.Wallets.create({ walletName });
    await dbWallet.update(nemWallet.accounts[0]);
    await dbWallet.generatePublicKey(walletPassword);
    return dbWallet;
}

module.exports = {
    createPrivateKeyWallet,
    createNewWallet
}