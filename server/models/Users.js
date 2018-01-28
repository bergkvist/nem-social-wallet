const nem = require('nem-sdk').default;
const { networkId, endpoint } = require('../config/nemconfig');
let db;

/**
 * Users - Referring to facebook users that have signed up/accepted use of the application
 */
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        fullname: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        facebookId: {
            type: DataTypes.STRING
        },
        messengerChatId: {
            type: DataTypes.STRING
        },
        profilePictureUrl: {
            type: DataTypes.STRING
        }
    });

    /**
     * Create associations between models in the database. 
     * Automatically run upon connecting to the database
     * @param {Object} models - Contains all other database models (ex: Wallets)
     */
    Users.associate = function(models) {
        Users.belongsTo(models.Wallets, { as: 'DefaultWallet', constraints: false });
        db = models;  // Make the db-models accessible to instance functions after association.
    }

    /**
     * Create a new NEM-wallet, with a random private key, and store it in the database.
     * The private key that was generated will be encrypted with password.
     * @param {String} walletName - The name of the wallet. Used for organization.
     * @param {String} password - The password that encrypts the wallet.
     * @return {Object} - The wallet that was created (encrypted)
     */
    Users.prototype.createWallet = async function(walletName, password) {
        const nemWallet = await nem.model.wallet.createPRNG(walletName, password, networkId);
        
        const UserId = this.id;
        const dbWallet = await db.Wallets.create({ walletName, UserId });
        await dbWallet.update(nemWallet.accounts[0]);
        await dbWallet.generatePublicKey(password);
        
        return dbWallet;
    }

    /**
     * Lists all wallets owned by the User.
     * @return {Array <Object>} - A list of the wallets.
     */
    Users.prototype.wallets = async function() {
        return db.Wallets.findAll({ where: { UserId: this.id }});
    }

    /**
     * Set the default wallet of the user.
     * @param {Object} dbWallet - Database object of the wallet.
     * @return {Object} - This user
     */
    Users.prototype.setDefaultWallet = function(dbWallet) {
        return this.update({ DefaultWalletId: dbWallet.id });
    }

    /** 
     * Check if the user has a default wallet.
     * @return {Boolean} - True if the user has a default wallet, otherwise false.
     */
    Users.prototype.hasDefaultWallet = function() {
        return (this.DefaultWalletId !== null);
    }

    /**
     * Get the default wallet of the user.
     * @return {Object} - Database object of the default wallet.
     */
    Users.prototype.defaultWallet = function() {
        return db.Wallets.findById(this.DefaultWalletId);
    }

    /**
     * Get the public key from the default wallet of the user.
     * @return {String} - The public key of the default wallet.
     */
    Users.prototype.publicKey = async function() {
        const dbWallet = await this.defaultWallet();
        return dbWallet.publicKey;
    }

    /**
     * Get the address from the default wallet of the user.
     * @return {String} - The address of the default wallet.
     */
    Users.prototype.address = async function() {
        const dbWallet = await this.defaultWallet();
        return dbWallet.address;
    }

    /**
     * Send a XEM-transaction from the user to another user, using default wallets.
     * @param {Number} amount - The amount of XEM to send.
     * @param {Object} recipientUser - The user that will receive the XEM.
     * @param {String} password - The password to decrypt the default wallet of the (sending) user.
     * @return {Object} - The response from the NEM-node the transaction was broadcasted to.
     */
    Users.prototype.sendXEM = async function (amount, recipientUser, password) {
        const dbWallet = await this.defaultWallet();
        const recipient = await recipientUser.address();
        return dbWallet.sendXEM(amount, recipient, password);
    }

    return Users;
}