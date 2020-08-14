var express = require('express')
var router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
var controller = require('../controllers/books.controller')

router.get('/', authMiddleware.requireAuth, controller.index);
router.get('/add',  authMiddleware.requireAuth,controller.addGet);
router.post('/add', controller.addPost);
router.get('/view/:id',  authMiddleware.requireAuth,controller.view);
router.get('/delete/:id',  authMiddleware.requireAuth,controller.delete);
router.get('/edit/:id',  authMiddleware.requireAuth,controller.editGet);
router.post('/edit/:id', controller.editPost);

module.exports = router;