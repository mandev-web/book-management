var express = require('express')
var router = express.Router();
var multer = require('multer');

var controller = require('../controllers/users.controller');
var validate = require('../validates/users.validate');
const authMiddleware = require('../middleware/auth.middleware');
var upload = multer({dest: './public/uploads/'})

router.get('/',  authMiddleware.requireAuth,controller.index);
router.get('/add',  authMiddleware.requireAuth,controller.addGet);
router.post('/add', upload.single('avatar'), validate.addPost, controller.addPost); 
router.get('/view/:id',  authMiddleware.requireAuth,controller.view);
router.get('/delete/:id',  authMiddleware.requireAuth,controller.delete);
router.get('/edit/:id',  authMiddleware.requireAuth,controller.editGet);
router.post('/edit/:id', controller.editPost);

module.exports = router