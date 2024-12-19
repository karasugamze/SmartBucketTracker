require('dotenv').config()
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',      // Veritabanı host adresi
    user: 'root',           // Veritabanı kullanıcı adı
    password: process.env.MYSQL_PASSWORD,           // Veritabanı şifresi
    database: 'smartbudgettracker', // Veritabanı adı
});

module.exports = pool.promise(); // Promise tabanlı bağlantı kullanımı
