const express = require('express');

const answerController = require('../controllers/answer');

const router = express.Router();

router.get('/:surveyId/:questionId', answerController.fetchAllAnswerByQuestion);
router.post('/add', answerController.createAnswer);
router.post('/delete/:surveyId/:questionId/:answerId', answerController.deleteAnswer);
router.post('/edit/:surveyId/:questionId/:answerId', answerController.editAnswer);

module.exports = router;
