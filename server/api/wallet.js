const nem = require('nem-sdk').default;
const { networkId, endpoint } = require('../config/nemconfig');
const db = require('../models');

function nemWalletFromDatabaseWallet(dbWallet) {
    const account = nemAccountFromDatabaseWallet(dbWallet);
    return { name: dbWallet.walletName, accounts: { '0': account } };
}

function nemAccountFromDatabaseWallet(dbWallet) {
    const account = { brain:     dbWallet.brain,
                      algo:      dbWallet.algo,
                      encrypted: dbWallet.encrypted,
                      iv:        dbWallet.iv,
                      address:   dbWallet.address,
                      label:     dbWallet.label,
                      network:   dbWallet.network };
    return account;
}

async function decryptWallet(dbWallet, walletPassword) {
    const account = await nemAccountFromDatabaseWallet(dbWallet);
    let common = await nem.model.objects.create('common')(walletPassword);
    await nem.crypto.helpers.passwordToPrivatekey(common, account, account.algo);
    return common;
}

async function createNewWallet(walletName, walletPassword) {
    const nemWallet = await nem.model.wallet.createPRNG(walletName, walletPassword, networkId);
    const dbWallet = await db.Wallets.create({ walletName });
    await dbWallet.update(nemWallet.accounts[0]);
    return dbWallet;
}

module.exports = {
    createNewWallet,
    decryptWallet
}