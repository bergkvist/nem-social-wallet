// WHAT IS THIS? : This file contains the default configuration for your database connection.

/* INSTRUCTIONS:
  Make a copy of this file, naming it "dbconfig.js".

  "dbconfig.js" will be ignored by git, so that you will not have to reconfigure your database
  info every time you pull changes or checkout a different commit.

  If "dbconfig.js" does not exist, this file will be used instead. */

module.exports = {
    username: 'default',
    password: 'default',
    database: 'default',
    host: '127.0.0.1',
    dialect: 'postgres'
}