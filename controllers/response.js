const dbConnect = require('../middlewares/DBConnect');

exports.submitResponse = async(req, res) => {

    try {
        if(req.body.responses && Object.keys(req.body.responses).length){
            let done = true;
            for (const key in req.body.responses) {
                for (anotherKey in req.body.responses[key]){
                    let sql = '';
                    if (anotherKey.includes('Text-')){
                        sql = `INSERT INTO responses (question_id, survey_id, description) VALUES ('${req.body.responses[key][anotherKey].question_id}', '${req.body.responses[key][anotherKey].survey_id}', '${req.body.responses[key][anotherKey].description}');`;
                    } else{
                        sql = `INSERT INTO responses (question_id, answer_id, survey_id) VALUES ('${req.body.responses[key][anotherKey].question_id}', '${req.body.responses[key][anotherKey].answer_id}', '${req.body.responses[key][anotherKey].survey_id}');`;
                    }

                    await dbConnect.connect().then((connection) => {
                        dbConnect.queryDB(connection, sql).then((result) => {
                            console.log(result);
                        }).catch((err) => {
                            console.log(err);
                            done = false;
                        });
                        connection.end();
                    }).catch((err) => {
                        done = false;
                    });

                    if(!(done)){
                        break;
                    }
                }

                if(!(done)){
                    break;
                }
            }

            if (done){
                return res.status(201).json({
                    status: 1,
                    message: `Response submitted successfully.`
                })
            } else{
                return res.status(500).json({
                    status: 0,
                    message: `Unable to submit responses.`
                })
            }

        } else {
            return res.status(500).json({
                status: 0,
                message: `Unable to submit responses.`
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 0,
            message: `Unable to submit responses.`
        })
    }

}

exports.generateReportBySurvey = async(req, res) => {

    const sql0 = `SELECT * FROM questions where survey_id = '${req.params.surveyId}';`;
    
    let result = [];
    let done = true;
    await dbConnect.connect().then(async(connection) => {
        await dbConnect.queryDB(connection, sql0).then(async(questions) => new Promise(async(resolve, reject) => {
            if(questions.length){
                for (const question in questions) {
                    let questionRes = {
                        answerStat: { },
                        total: 0
                    }
                    const sql1 = `SELECT count(*) FROM responses where survey_id = '${req.params.surveyId}' AND question_id = '${questions[question].id}' AND created_at BETWEEN '${req.params.from}' and '${req.params.to}';`;
                    await dbConnect.queryDB(connection, sql1).then(async(noOfResponse) => new Promise(async(resolve, reject) => {
                        if(noOfResponse[0]['count(*)']){
                            questionRes.total = noOfResponse[0]['count(*)'];
                            
                            const sql2 = `SELECT * FROM answers where survey_id = '${req.params.surveyId}' AND question_id = '${questions[question].id}';`;

                            if(questions[question].answer_type == 2){
                                const sql2 = `SELECT * FROM responses where survey_id = '${req.params.surveyId}' AND question_id = '${questions[question].id}';`;

                                await dbConnect.queryDB(connection, sql2).then((answers) => new Promise(async(resolve, reject) => {
                                    if(answers.length){
                                        
                                        for (const answer in answers) {
                                            result.push([
                                                `Q${parseInt(question, 10)+1}`,
                                                questions[question].description,
                                                answers[answer].description,
                                                null,
                                                null,
                                                null,
                                                null,
                                            ])
                                        }
    
                                        resolve()
                                    } else{
                                        // done = false;
                                        // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%22222222222')
                                        resolve()
                                    }
    
                                })).catch((err) => {
                                    console.log(err);
                                    // done = false;
                                    // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%7777')
                                    resolve()
                                });
    
                                resolve()

                            } else {
                                await dbConnect.queryDB(connection, sql2).then((answers) => new Promise(async(resolve, reject) => {
                                    if(answers.length){
                                        
                                        for (const answer in answers) {
                                            let answerRes = {
                                                no: 0,
                                                percent: 0
                                            }
    
                                            const sql3 = `SELECT count(*) FROM responses where survey_id = '${req.params.surveyId}' AND question_id = '${questions[question].id}' AND answer_id = '${answers[answer].id}';`;
    
                                            await dbConnect.queryDB(connection, sql3).then((noOfResponseByAnswer) => new Promise((resolve, reject) => {
                                                if(noOfResponseByAnswer[0]['count(*)']){
                                                    answerRes.no = noOfResponseByAnswer[0]['count(*)'];
                                                    answerRes.percent = (noOfResponseByAnswer[0]['count(*)'] / noOfResponse[0]['count(*)']) * 100
                                                    // console.log(answerRes)
                                                    result.push([
                                                        `Q${parseInt(question, 10)+1}`,
                                                        questions[question].description,
                                                        answers[answer].description,
                                                        noOfResponseByAnswer[0]['count(*)'],
                                                        ((noOfResponseByAnswer[0]['count(*)'] / noOfResponse[0]['count(*)']) * 100).toFixed(2),
                                                        noOfResponse[0]['count(*)'],
                                                        100,
                                                    ])
                                                    console.log(result)
                                                    resolve();
                                                } else{
                                                    // done = false;
                                                    // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%4444444')
                                                    resolve();
                                                }
                                                
                                            })).catch((err) => {
                                                console.log(err);
                                                // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%333333333')
                                                // done = false;
                                            });
    
                                            // if(!(done)){
                                            //     break;
                                            // }
                                            questionRes.answerStat[answers[answer].id] = answerRes;
                                            // console.log(answerRes)
                                        }
    
                                        resolve()
                                    } else{
                                        // done = false;
                                        // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%22222222222')
                                        resolve()
                                    }
    
                                })).catch((err) => {
                                    console.log(err);
                                    // done = false;
                                    // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%7777')
                                    resolve()
                                });
    
                                resolve()
                            }
                            
                        } else{
                            // done = false;
                            // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%6666')
                            resolve()
                        }
                    })).catch((err) => {
                        console.log(err);
                        // done = false;
                        // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%555555')
                        resolve()
                    });

                    if(!(done)){
                        break;
                    }

                    // result[questions[question].id] = questionRes;
                    // console.log(questionRes)
                }

            } else{
                connection.end();
                return res.status(500).json({
                    status: 0,
                    message: `Error generating statistical report.`
                })
            }
            
            console.log(result)
            console.log('*************')

            if (done){

                return res.status(201).json({
                    status: 1,
                    data: result,
                    message: `Statustucal report generated successfully...`
                })
            } else{
                connection.end();
                return res.status(500).json({
                    status: 0,
                    message: `Error generating statistical report.`
                })
            }
            resolve()
        })).catch((err) => {
            console.log(err);
            connection.end();
            return res.status(500).json({
                status: 0,
                message: `There are no questions to generate statistical report.`
            })
        });

    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            status: 0,
            message: `Error generating statistical report.`
        })
    });
}


exports.checkSurvey = async(req, res) => {

    const sql = `SELECT count(*) FROM responses where survey_id='${req.params.surveyId}';`;
    
    const connection = await dbConnect.connect().then((connection) => {
        dbConnect.queryDB(connection, sql).then((result) => {
            connection.end();
            return res.status(200).json({
                status: 1,
                data: result[0]['count(*)'],
                message: `Survey response count fetched successfully.`
            })
        }).catch((err) => {
            console.log(err);
            connection.end();
            return res.status(500).json({
                status: 0,
                message: `Unable to fetch all survey response count.`
            })
        });

    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            status: 0,
            message: `Unable to fetch all survey response count.`
        })
    });
}