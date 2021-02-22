const { Pool } = require("pg");

module.exports = new Pool({
  user: "tiago",
  password: "LOLtbl.2014",
  host: "localhost",
  port: 5432,
  database: "gym-manager",
});
