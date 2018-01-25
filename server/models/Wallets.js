module.exports = (sequelize, DataTypes) => {
    const Wallets = sequelize.define('Wallets', {
        walletName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        brain: DataTypes.BOOLEAN,
        algo: DataTypes.STRING,
        encrypted: DataTypes.STRING,
        iv: DataTypes.STRING,
        address: DataTypes.STRING,
        label: DataTypes.STRING,
        network: DataTypes.INTEGER,
    }, {
        classMethods: {
            associate: models => {
                Wallets.belongsTo(models.Users);
            }
        }
    });
    return Wallets;
}