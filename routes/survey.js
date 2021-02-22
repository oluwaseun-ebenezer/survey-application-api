const express = require('express');

const surveyController = require('../controllers/survey');

const router = express.Router();

router.get('/', surveyController.fetchAllSurvey);
router.get('/:surveyId', surveyController.fetchSurvey);
router.post('/add', surveyController.createSurvey);
router.post('/delete/:surveyId', surveyController.deleteSurvey);
router.post('/edit/:surveyId', surveyController.editSurvey);

module.exports = router;
