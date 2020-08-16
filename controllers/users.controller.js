var db = require('../db');
const shortid = require('shortid');
var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });
module.exports.index = function(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 8;
    var begin = (page-1)*perPage;
    var end = page * perPage;

    res.render('./users/index', {
        users: db.get('users').value().slice(begin, end),
        page: page
    })
}
module.exports.addGet = function(req, res) {
    res.render('./users/add')
}
module.exports.addPost = async function(req, res) {
    var user = req.body;
    var error = [];
    if (db.get('users').find({mail: user.mail}).value()) 
    {
        error.push("User was exist")
        res.render('./users/add', {
            errors: error
        })
        return;
    }
    user.id = shortid.generate();
    link = req.file.path.split('\\').slice(1).join('/');
    var avatarUrl;
    await cloudinary.uploader.upload("public/" + link, function(error, result) { 
        console.log(result);
        console.log(result.url)
        avatarUrl = result.url;
    });
    user.avatarUrl = avatarUrl;
    db.get('users').push(user).write();

    res.redirect('/users');
    
}
module.exports.view = function(req, res){
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();

    res.render('./users/view', {
        user: user
    })

}
module.exports.delete = function(req, res){
    var id = req.params.id;
    
    db.get('users').remove({id: id}).write();

    res.redirect('/users');
}
module.exports.editGet = function(req, res) {
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();

    res.render('users/update', {
        user: user
    })
}
module.exports.editPost = function(req, res){
    var pro;
    var user = db.get('users').find({id: req.params.id}).value();

    for (variable in req.body) {
        pro = variable
    }

    user[pro] = req.body[pro];

    db.get('users').find({id: req.params.id}).assign(user).write();

    res.redirect('back');
}