module.exports = (sequelize, DataTypes) => sequelize.define('Transactions', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1
    },

    amount: {
        type: DataTypes.DECIMAL
    },

}, {
    classMethods: {
        associate: models => {
            models.Transactions.belongsTo(models.Users, {
                as: 'receiverId'
            });
            models.Transactions.belongsTo(models.Users, {
                as: 'senderId'
            });
        }
    },
    instanceMethods: {
        verifySignature()
    },
    hooks: {

    }
});