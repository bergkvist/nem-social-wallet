var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var db        = {};

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


if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
  if ('addScopes' in db[modelName]) {
    db[modelName].addScopes(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;