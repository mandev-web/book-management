var db = require('../db');
const shortid = require('shortid');

module.exports.index = function(req, res) {
    res.render('./users/index', {
        users: db.get('users').value()
    })
}
module.exports.addGet = function(req, res) {
    res.render('./users/add')
}
module.exports.addPost = function(req, res) {
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