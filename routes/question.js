const express = require('express');

const questionController = require('../controllers/question');

const router = express.Router();

router.get('/:surveyId', questionController.fetchAllQuestionBySurvey);
router.post('/add', questionController.createQuestion);
router.post('/delete/:surveyId/:questionId', questionController.deleteQuestion);
router.post('/edit/:surveyId/:questionId', questionController.editQuestion);

module.exports = router;
