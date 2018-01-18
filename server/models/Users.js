

module.exports = (sequelize, DataTypes) => sequelize.define('Users', {
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
    },
    phone: {
        type: DataTypes.STRING
    },
    wallet: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    publicKey: {
        type: DataTypes.STRING
    }
}, {
    classMethods: {
        associate: models => {

        }
    },
    instanceMethods: {
        fullname: () => `${this.firstname} ${this.lastname}`
    },
    hooks: {

    }
});