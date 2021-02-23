const dbConnect = require('../middlewares/DBConnect');

exports.createQuestion = async(req, res) => {

    const sql = `INSERT INTO questions (description, survey_id, answer_type, compulsory) VALUES ('${req.body.description.replace("'", "''")}', '${req.body.surveyId}', '${req.body.answerType}', '${req.body.compulsory}');`;
    
    await dbConnect.connect().then((connection) => {
        dbConnect.queryDB(connection, sql).then((result) => {
            connection.end();
            return res.status(201).json({
                status: 1,
                message: `Question added to survey successfully.`
            })
        }).catch((err) => {
            connection.end();
            return res.status(500).json({
                status: 0,
                message: `Unable to add question to survey.`
            })
        });

    }).catch((err) => {
        return res.status(500).json({
            status: 0,
            message: `Unable to add question to survey .`
        })
    });
}

exports.fetchAllQuestionBySurvey = async(req, res) => {

    const sql = `SELECT * FROM questions WHERE survey_id = '${req.params.surveyId}';`;
    
    await dbConnect.connect().then((connection) => {
        dbConnect.queryDB(connection, sql).then((result) => {
            connection.end();
            return res.status(200).json({
                status: 1,
                data: result,
                message: `Questons fetched successfully.`
            })
        }).catch((err) => {
            connection.end();
            return res.status(500).json({
                status: 0,
                message: `Unable to fetch all questions for survey.`
            })
        });

    }).catch((err) => {
        return res.status(500).json({
            status: 0,
            message: `Unable to fetch all questions for survey.`
        })
    });
}

exports.editQuestion = async(req, res) => {
    const sql = `UPDATE questions SET description='${req.body.description.replace("'", "''")}', compulsory='${req.body.compulsory}', answer_type='${req.body.answerType}' WHERE id = '${req.params.questionId}' AND survey_id = '${req.params.surveyId}';`;
    
    const connection = await dbConnect.connect().then((connection) => {
        dbConnect.queryDB(connection, sql).then((result) => {
            connection.end();
            return res.status(201).json({
                status: 1,
                message: `Question updated successfully.`
            })
        }).catch((err) => {
            connection.end();
            return res.status(500).json({
                status: 0,
                message: `Unable to update question.`
            })
        });

    }).catch((err) => {
        return res.status(500).json({
            status: 0,
            message: `Unable to update question.`
        })
    });
}

exports.deleteQuestion = async(req, res) => {

    const sql = `DELETE FROM questions WHERE id='${req.params.questionId}' AND survey_id = '${req.params.surveyId}';`;
    
    const connection = await dbConnect.connect().then((connection) => {
        dbConnect.queryDB(connection, sql).then((result) => {
            connection.end();
            return res.status(201).json({
                status: 1,
                message: `Question deleted successfully.`
            })
        }).catch((err) => {
            connection.end();
            return res.status(500).json({
                status: 0,
                message: `Unable to delete question.`
            })
        });

    }).catch((err) => {
        return res.status(500).json({
            status: 0,
            message: `Unable to delete question .`
        })
    });
}
