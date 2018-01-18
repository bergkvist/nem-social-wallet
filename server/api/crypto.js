const nem = require('nem-sdk').default;

function generateKeyPair(hexSeed) {
    const networkId = nem.model.network.data.testnet.id; //?

    //const rBytes = nem.crypto.nacl.randomBytes(32); //?
    //const rHex = nem.utils.convert.ua2hex(rBytes); //?
    const keyPair = nem.crypto.keyPair.create(hexSeed); //?

    const secretKey = nem.utils.convert.ua2hex(keyPair.secretKey); //?
    const publicKey = nem.utils.convert.ua2hex(keyPair.publicKey.data); //?
    const address = nem.model.address.toAddress(publicKey, networkId); //?

    return { secretKey, publicKey, address };
}

function createTransaction(user) {

    let txobj = {
        isMultisig: false,
        recipient: '',
        amount: '1',
        message: '',
        due: 60
    }
}

function createSignedTransaction(privateKey) {
    // Generate unsigned transaction
    const txEntity = nem.model.transactions.prepare('transferTransaction')(
        { privateKey }, 
        { amount: nem.utils.helpers.cleanTextAmount('5'),
          recipient: nem.model.address.clean('') },
        nem.model.network.data.testnet.id
    );
    console.log(`txEntity: ${txEntity}`);

    // Serialize the unsigned transaction
    const serializedTx = nem.utils.serialization.serializeTransaction(txEntity);
    console.log(`serializedTx: ${serializedTx}`);
    
    // Generate keyPair from private key
    const keyPair = nem.crypto.keyPair.create(this.common.privateKey);
    console.log(`keyPair: ${keyPair}`);

    // Sign the serialized transaction
    const signature = keyPair.sign(serializedTx);
    console.log(`signature: ${signature}`);

    return JSON.stringify({
        data: nem.utils.convert.ua2hex(serializedTx),
        signature: signature.toString()
    });
}

module.exports = { createSignedTransaction, generateKeyPair };