var express = require('express');
var router = express.Router();
var gameControl = require('../controllers/gameController');

router.get('/friendFish', gameControl.getFishing);
router.get('/acceptFish', gameControl.getAcceptFishing);
router.get('/password-lesson', gameControl.getPasswordLesson);
router.get('/fishing-lesson', gameControl.getFishingPageLesson);
router.get('/ciberlexa', gameControl.getMenu);
router.post('/friendFish',  gameControl.postFish);

//test
router.get('/friend/:link', gameControl.getFishPage);
router.post('/returnFish/:link',gameControl.returnFish);

module.exports =  router;