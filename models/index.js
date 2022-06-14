const mysql = require('mysql2/promise');

const db = {
    connection: null
}

const connect = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'lilit',
        password: '$l5i9l1i7t$',
        database: 'appregister',
        port: 3306
    });
    db.connection = connection
}

connect()

module.exports = db
