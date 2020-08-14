var express = require('express')
var router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
var controller = require('../controllers/auth.controller');

router.get('/login', controller.loginGet);
router.post('/login', controller.loginPost);

module.exports = router