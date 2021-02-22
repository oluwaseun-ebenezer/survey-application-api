const dbConnect = require('../middlewares/DBConnect');

exports.up = async() => {
    const connection = await dbConnect.connect().then((connection)=>{
        const sql = "CREATE TABLE IF NOT EXISTS questions(" + 
            "id INT AUTO_INCREMENT NOT NULL," +
            "description TEXT NOT NULL," +
            "survey_id INT NOT NULL," +
            "answer_type INT NOT NULL," +
            "compulsory INT NOT NULL," +
            "created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP," +
            "updated_at TIMESTAMP DEFAULT NULL," +
            
            "PRIMARY KEY(id)," +
            "FOREIGN KEY(survey_id) REFERENCES surveys(id) ON DELETE CASCADE ON UPDATE CASCADE" +
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
