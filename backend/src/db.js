const mysql = require('mysql');
const mysqlConfig = require('./configurations/mysql.config');

// Crea la conexion a la base de datos
const connection = mysql.createConnection({
    host: mysqlConfig.HOST,
    user: mysqlConfig.USER,
    password: mysqlConfig.PASSWORD,
    database: mysqlConfig.DB
});

// Abrir la conexion
connection.connect(error => {
    if (error) throw error;
    console.log('Conexion exitosa a la base de datos.');
});

module.exports = connection;