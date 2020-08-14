var express = require('express')
var router = express.Router();

var controller = require('../controllers/transactions.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/',  authMiddleware.requireAuth,controller.index)
router.get('/add',  authMiddleware.requireAuth,controller.addGet)
router.post('/add', controller.addPost)
router.get('/delete/:id',  authMiddleware.requireAuth,controller.delete)
//router.get('/complete', controller.completeGet)
router.get('/edit/:id',  authMiddleware.requireAuth,controller.editGet)
router.post('/edit/:id', controller.editPost)

module.exports = router