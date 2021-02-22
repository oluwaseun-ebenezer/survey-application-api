const dbConnect = require('../middlewares/DBConnect');

exports.fetchSurvey = async(req, res) => {

    const sql = `SELECT * FROM surveys WHERE id='${req.params.surveyId}';`;
    
    const connection = await dbConnect.connect().then((connection) => {
        dbConnect.queryDB(connection, sql).then((result) => {
            console.log(result);
            connection.end();
            return res.status(200).json({
                status: 1,
                data: result[0],
                message: `Survey fetched successfully.`
            })
        }).catch((err) => {
            console.log(err);
            connection.end();
            return res.status(500).json({
                status: 0,
                message: `Unable to fetch all survey.`
            })
        });

    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            status: 0,
            message: `Unable to fetch all survey.`
        })
    });
}

exports.createSurvey = async(req, res) => {
    const sql = `INSERT INTO surveys (title, description) VALUES ('${req.body.title.replace("'", "''")}', '${req.body.description.replace("'", "''")}');`;
    
    const connection = await dbConnect.connect().then((connection) => {
        dbConnect.queryDB(connection, sql).then((result) => {
            console.log(result);
            connection.end();
            return res.status(201).json({
                status: 1,
                message: `Survey created successfully.`
            })
        }).catch((err) => {
            console.log(err);
            connection.end();
            return res.status(500).json({
                status: 0,
                message: `Unable to create survey.`
            })
        });

    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            status: 0,
            message: `Unable to create survey .`
        })
    });
}

exports.fetchAllSurvey = async(req, res) => {

    const sql = `SELECT * FROM surveys;`;
    
    const connection = await dbConnect.connect().then((connection) => {
        dbConnect.queryDB(connection, sql).then((result) => {
            console.log(result);
            connection.end();
            return res.status(200).json({
                status: 1,
                data: result,
                message: `Surveys fetched successfully.`
            })
        }).catch((err) => {
            console.log(err);
            connection.end();
            return res.status(500).json({
                status: 0,
                message: `Unable to fetch all surveys.`
            })
        });

    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            status: 0,
            message: `Unable to fetch all surveys.`
        })
    });
}

exports.editSurvey = async(req, res) => {
    const sql = `UPDATE surveys SET title='${req.body.title.replace("'", "''")}', description='${req.body.description.replace("'", "''")}' WHERE id = '${req.params.surveyId}';`;
    
    const connection = await dbConnect.connect().then((connection) => {
        dbConnect.queryDB(connection, sql).then((result) => {
            console.log(result);
            connection.end();
            return res.status(201).json({
                status: 1,
                message: `Survey updated successfully.`
            })
        }).catch((err) => {
            console.log(err);
            connection.end();
            return res.status(500).json({
                status: 0,
                message: `Unable to update survey.`
            })
        });

    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            status: 0,
            message: `Unable to update survey.`
        })
    });
}

exports.deleteSurvey = async(req, res) => {

    const sql = `DELETE FROM surveys WHERE id='${req.params.surveyId}';`;
    
    const connection = await dbConnect.connect().then((connection) => {
        dbConnect.queryDB(connection, sql).then((result) => {
            console.log(result);
            connection.end();
            return res.status(201).json({
                status: 1,
                message: `Survey deleted successfully.`
            })
        }).catch((err) => {
            console.log(err);
            connection.end();
            return res.status(500).json({
                status: 0,
                message: `Unable to delete survey.`
            })
        });

    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            status: 0,
            message: `Unable to delete survey .`
        })
    });
}
