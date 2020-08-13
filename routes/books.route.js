var express = require('express')
var router = express.Router();

var controller = require('../controllers/books.controller')

router.get('/', controller.index);
router.get('/add', controller.addGet);
router.post('/add', controller.addPost);
router.get('/view/:id', controller.view);
router.get('/delete/:id', controller.delete);
router.get('/edit/:id', controller.editGet);
router.post('/edit/:id', controller.editPost);

module.exports = router;