const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
const db        = {};

let config;
try {
    config = require(__dirname + '/../config/dbconfig.js');
} catch (err) {
    console.error(err);
    console.log(
        '/-=================\n' +
        '| IMPORTANT NOTICE!\n' +
        '| > You have not created a custom config file for your database connection!\n' +
        '| > Using default config instead.\n' +
        '| > See "/server/config/dbconfig.default.js" for instructions on how to create\n' +
        '|   your own database connection file\n' +
        '\\-=================\n'
    );
    config = require(__dirname + '/../config/dbconfig.default.js');
}

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));

    if (model.associate)      model.associate(db);
    if ('addScopes' in model) model.addScopes(db);
    
    db[model.name] = model;
  });

module.exports = db;