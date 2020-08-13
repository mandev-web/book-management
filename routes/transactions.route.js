var express = require('express')
var router = express.Router();

var controller = require('../controllers/transactions.controller');

router.get('/', controller.index)
router.get('/add', controller.addGet)
router.post('/add', controller.addPost)
router.get('/delete/:id', controller.delete)
//router.get('/complete', controller.completeGet)
router.get('/edit/:id', controller.editGet)
router.post('/edit/:id', controller.editPost)

module.exports = router