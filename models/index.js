const mysql = require('mysql2/promise');

const db = {
    connection: null
}

const connect = async () => {
    const connection = await mysql.createConnection({
        host: '173.249.39.10',
        user: 'lilit_test',
        password: '123456',
        database: 'lilit_test',
        port: 3306
    });
    db.connection = connection
}

connect()

module.exports = db
