const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');





//My(MAKSIM) Test Code
//router.get('/user',userController.authentication);
router.get('/', userController.getMainPage);

router.get('/login',userController.getLogin);
router.post('/login',userController.postLogin);
router.get('/logout',userController.getLogout);



router.get('/register', userController.getReginster);
router.post('/register', userController.postRegister);


module.exports = router;