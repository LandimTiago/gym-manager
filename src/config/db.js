const { Pool } = require('pg')

module.exports = new Pool({
    user: "postgres",
    password:"LOLtbl.2014",
    host: "localhost",
    port: 5432,
    database:"gymmanager"
})