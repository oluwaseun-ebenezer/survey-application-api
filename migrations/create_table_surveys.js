const dbConnect = require('../middlewares/DBConnect');

exports.up = async() => {
    const connection = await dbConnect.connect().then((connection)=>{
        const sql = "CREATE TABLE IF NOT EXISTS surveys(" + 
            "id INT AUTO_INCREMENT NOT NULL," + 
            "title VARCHAR(255) NOT NULL," +
            "description VARCHAR(255) NOT NULL," +
            "created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP," +
            "updated_at TIMESTAMP DEFAULT NULL," +
            
            "PRIMARY KEY(id)" +
        ");";

        dbConnect.queryDB(connection, sql).then((res) => {
            console.log(res);
            connection.end();
        }).catch((err) => {
            console.log(err)
            connection.end();
        });

    }).catch((err) => {
        console.log(err);
    });
}
