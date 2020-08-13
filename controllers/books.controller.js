var db = require('../db');
const shortid = require('shortid');

module.exports.index = function(req, res) {
    res.render('./books/index', {
        books: db.get('books').value()
    })
}
module.exports.addGet = function(req, res) {
    res.render('./books/add')
}
module.exports.addPost = function(req, res) {
    var book = req.body;
    book.id = shortid.generate();
    book.content = "lorem Ipsum is simply dummy text of the printing and";

    db.get('books').push(book).write();

    res.redirect('/books');
}
module.exports.view = function(req, res) {
    var id = req.params.id;
    var book = db.get('books').find({id : id}).value();

    console.log(book);
    res.render('books/view', {
        book: book
    })
}
module.exports.delete = function(req, res) {
    var id = req.params.id;
    var book = db.get('books').find({id: id}).value();

    db.get('books').remove({id: id}).write();

    res.redirect('/books');
}
module.exports.editGet = function(req, res) {
    var id = req.params.id;
    var book = db.get('books').find({id: id}).value();

    res.render('books/update', {
        id: id
    })

}
module.exports.editPost = function(req, res) {
    var id = req.params.id;
    var updateTitle = req.body;
    
    var book = db.get('books').find({id: id}).value();

    db.get('books').find({name: book.name}).assign({name: updateTitle.name}).write();

    res.redirect('/books');
}