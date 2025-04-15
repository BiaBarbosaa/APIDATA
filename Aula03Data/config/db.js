const mysql = require('mysql2/promise');
require('dotenv').config();

//criar conexão com o banco
const cliente = mysql.createPool({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
});
module.exports = cliente;