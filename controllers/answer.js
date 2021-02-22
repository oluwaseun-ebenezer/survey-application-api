const dbConnect = require('../middlewares/DBConnect');

exports.createAnswer = async(req, res) => {

    const sql = `INSERT INTO answers (description, survey_id, question_id) VALUES ('${req.body.description.replace("'", "''")}', '${req.body.surveyId}', '${req.body.questionId}');`;
    
    await dbConnect.connect().then((connection) => {
        dbConnect.queryDB(connection, sql).then((result) => {
            console.log(result);
            connection.end();
            return res.status(201).json({
                status: 1,
                message: `Answer attached to question successfully.`
            })
        }).catch((err) => {
            console.log(err);
            connection.end();
            return res.status(500).json({
                status: 0,
                message: `Unable to attach answer to question.`
            })
        });

    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            status: 0,
            message: `Unable to attach answer to question.`
        })
    });
}

exports.fetchAllAnswerByQuestion = async(req, res) => {

    const sql = `SELECT * FROM answers WHERE survey_id = '${req.params.surveyId}' AND question_id = '${req.params.questionId}';`;
    
    await dbConnect.connect().then((connection) => {
        dbConnect.queryDB(connection, sql).then((result) => {
            console.log(result);
            connection.end();
            return res.status(200).json({
                status: 1,
                data: result,
                message: `Answers to question fetched successfully.`
            })
        }).catch((err) => {
            console.log(err);
            connection.end();
            return res.status(500).json({
                status: 0,
                message: `Unable to fetch answers to questions for survey.`
            })
        });

    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            status: 0,
            message: `Unable to fetch answers to questions for survey.`
        })
    });
}

exports.editAnswer = async(req, res) => {
    const sql = `UPDATE answers SET description='${req.body.description.replace("'", "''")}' WHERE id = '${req.params.answerId}' AND survey_id = '${req.params.surveyId}' AND question_id = '${req.params.questionId}';`;
    
    const connection = await dbConnect.connect().then((connection) => {
        dbConnect.queryDB(connection, sql).then((result) => {
            console.log(result);
            connection.end();
            return res.status(201).json({
                status: 1,
                message: `Answer updated successfully.`
            })
        }).catch((err) => {
            console.log(err);
            connection.end();
            return res.status(500).json({
                status: 0,
                message: `Unable to update answer.`
            })
        });

    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            status: 0,
            message: `Unable to update answer.`
        })
    });
}

exports.deleteAnswer = async(req, res) => {

    const sql = `DELETE FROM answers  WHERE id = '${req.params.answerId}' AND survey_id = '${req.params.surveyId}' AND question_id = '${req.params.questionId}';`;
    
    const connection = await dbConnect.connect().then((connection) => {
        dbConnect.queryDB(connection, sql).then((result) => {
            console.log(result);
            connection.end();
            return res.status(201).json({
                status: 1,
                message: `Answer deleted successfully.`
            })
        }).catch((err) => {
            console.log(err);
            connection.end();
            return res.status(500).json({
                status: 0,
                message: `Unable to delete answer.`
            })
        });

    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            status: 0,
            message: `Unable to delete answer .`
        })
    });
}
