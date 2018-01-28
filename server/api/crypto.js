const nem = require('nem-sdk').default;
const { networkId, endpoint } = require('../config/nemconfig');

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


module.exports = {
    generatePrivateKey
};