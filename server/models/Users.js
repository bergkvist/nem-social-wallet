

module.exports = (sequelize, DataTypes) => sequelize.define('Users', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1
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