const mysql = require('mysql8');

const env = require('../env');
exports.connect = () => {
    const con = mysql.createConnection({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASS,
        database: env.DB,
    });
    
    return new Promise((resolve, reject) => {
        con.connect(( err ) => {
            if ( err ) {
                reject(err);
            } else {
                console.log('MySql connected successfully...');
                resolve(con);
            }
        });
    })
}

exports.queryDB = (connection, sql, values='') => {
    if(values.length){
        return new Promise((resolve, reject) => {
            connection.query(sql, [values], (err, result) => {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        });
    } else {
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
    
}
