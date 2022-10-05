const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '10.0.0.33',
      port : 3306,
      user : 'inventory',
      password : 'dbpassword',
      database : 'tlinventory'
    }
  });
module.exports = knex;