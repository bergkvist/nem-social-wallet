const nem = require('nem-sdk').default;
const { networkId, endpoint } = require('../config/nemconfig');
let db;

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        firstname: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        }
    });

    Users.associate = function(models) {
        db = models;
    }

    Users.prototype.createWallet = async function(walletName, password) {
        const nemWallet = await nem.model.wallet.createPRNG(walletName, password, networkId);
        
        const UserId = this.id;
        const dbWallet = await db.Wallets.create({ walletName, UserId });
        await dbWallet.update(nemWallet.accounts[0]);
        await dbWallet.generatePublicKey(password);
        
        return dbWallet;
    }

    // TODO: FIX
    Users.prototype.wallets = () => {
        return db.Wallets.findAll({ where: { UserId: this.id }});
    }


    return Users;
}