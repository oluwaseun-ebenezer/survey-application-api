const express = require('express');

const responseController = require('../controllers/response');

const router = express.Router();

router.post('/', responseController.submitResponse);

// get total response to a question according to survey
router.get('/statistics/:surveyId/:from/:to', responseController.generateReportBySurvey);
router.get('/check/:surveyId', responseController.checkSurvey);
router.post('/', responseController.submitResponse);

module.exports = router;
