const nem = require('nem-sdk').default;
const { networkId, endpoint } = require('../config/nemconfig');
endpoint
/**
 * Throws an error if common.privateKey is not a valid privateKey.
 * @param {Object} common - The common object containing the privateKey.
 */
function assertCommonHasValidPrivateKey(common) {
    if (common === undefined) {
        throw new Error("Missing argument: 'common'");
    }
    if (common.privateKey === undefined) {
        throw new Error("'common.privateKey' is undefined");
    } 
    if (common.privateKey === '') {
        throw new Error("'common.privateKey' is empty");
    }
    if (!nem.utils.helpers.isPrivateKeyValid(common.privateKey)) {
        throw new Error("'common.privateKey' is not a valid privateKey");
    }
}

/**
 * Throws an error if the recipient address is invalid.
 * @param {String} recipient - A hex-string containing the address of the recipient.
 */
function assertValidRecipient(recipient) {
    if (recipient === undefined) {
        throw new Error("Missing argument: 'recipient'");
    }
    if (!nem.model.address.isValid(recipient)) {
        throw new Error("'recipient' is invalid");
    }
    if (!nem.model.address.isFromNetwork(recipient, networkId)) {
        throw new Error("'recipient' is from a different network");
    }
}


function generatePrivateKey() {
    const randomBytes = nem.crypto.nacl.randomBytes(32);
    const privateKey = nem.utils.convert.ua2hex(randomBytes);
    return privateKey;
}

function commonFromPrivateKey(privateKey) {
    const common = nem.model.objects.create('common')('', privateKey);
    assertCommonHasValidPrivateKey(common);
    return common;
}

function addressFromCommon(common) {
    assertCommonHasValidPrivateKey(common);
    const keyPair = nem.crypto.keyPair.create(common.privateKey);
    const publicKey = nem.utils.convert.ua2hex(keyPair.publicKey.data);
    const address = nem.model.address.toAddress(publicKey, networkId);
    return address;
}

function publicKeyFromCommon(common) {
    assertCommonHasValidPrivateKey(common);
    const keyPair = nem.crypto.keyPair.create(common.privateKey);
    const publicKey = nem.utils.convert.ua2hex(keyPair.publicKey.data);
    return publicKey;
}

function secretKeyFromCommon(common) {
    assertCommonHasValidPrivateKey(common);
    const keyPair = nem.crypto.keyPair.create(common.privateKey);
    const secretKey = nem.utils.convert.ua2hex(keyPair.secretKey);
    return secretKey;
}

function createTransferTransaction(amount, recipient) {
    assertValidRecipient(recipient);
    const transferTransaction = nem.model.objects.create('transferTransaction')(recipient, amount);
    return transferTransaction;
}

function broadcastTransferTransaction(transferTransaction, common) {
    assertCommonHasValidPrivateKey(common);
    const transactionEntity = nem.model.transactions.prepare('transferTransaction')(common, transferTransaction, networkId);
    const broadcastedTransactionPromise = nem.model.transactions.send(common, transactionEntity, endpoint);
    return broadcastedTransactionPromise;
}

function sendTransferTransaction(amount, recipient, common) {
    const transferTransaction = createTransferTransaction(amount, recipient);
    const broadcastedTransactionPromise = broadcastTransferTransaction(transferTransaction, common);
    return broadcastedTransactionPromise;
}


module.exports = {
    generatePrivateKey,
    commonFromPrivateKey,
    addressFromCommon,
    publicKeyFromCommon,
    createTransferTransaction,
    broadcastTransferTransaction,
    sendTransferTransaction
};