const mysql = require('mysql2');
require('dotenv').config();

// const fs = require('fs');
// const sqlFilePath = './table.sql';
// const sqlFile = fs.readFileSync(sqlFilePath, 'utf-8');
// const sqlCommands = sqlFile.split(';').filter(command => command.trim());

var connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) =>{
    if(!err) {
        console.log('connected');
    }
    else {
        console.log(err);
    }
})

// for (const command of sqlCommands) {
//     connection.query(command);
// }

module.exports = connection;
