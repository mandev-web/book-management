var db = require('../db');
const shortid = require('shortid');
const express = require('express');

module.exports.index = function(req, res) {
    console.log(req.singedCookies);
    var id = req.signedCookies.userId;
    var user = db.get('users').find({id: id}).value();
    var transactions = [];

    if (user.isAdmin == true) {
        transactions = db.get('transactions').value()
    } else 
    transactions = db.get('transactions').filter(function(transaction) {
        return transaction.idUser == id
    }).value()

    res.render('./transactions/index', {
        transactions: transactions,
        users: db.get('users').value(),
        books: db.get('books').value()
    })
}
module.exports.addGet =  function(req, res) {
    res.render('./transactions/add', {
        users: db.get('users').value(),
        books: db.get('books').value()
    })
}
module.exports.addPost =  function(req, res) {
    console.log(req.body);
    var idUser = db.get('users').find({name: req.body.name[0]}).value().id;
    var idBook = db.get('books').find({name: req.body.name[1]}).value().id;
    var id = shortid.generate();
    
    var transaction = {
        idUser: idUser,
        idBook: idBook,
        id: id,
        isComplete: false
    }

    db.get('transactions').push(transaction).write();

    res.redirect('/transactions');
}
module.exports.delete = function(req, res) {
    var id = req.params.id;
    
    db.get('transactions').remove({id: id}).write();

    res.redirect('/transactions');
}
module.exports.completeGet = function(req, res) {
    res.render('../views/transactions/complete', {
        transactions: db.get('transactions').value(),
        users: db.get('users').value(),
        books: db.get('transactions').value()
    });
}
module.exports.editGet = function(req, res) {
    var transaction = db.get('transactions').find({id: req.params.id}).value();

    res.render('../views/transactions/edit', {
        transaction: transaction,
        users: db.get('users').value(),
        books: db.get('books').value()
    })
}
module.exports.editPost = function(req, res) {
    var id = req.params.id;
    var transaction = db.get('transactions').find({id: id}).value();
    transaction.isComplete = req.body.status == 'true' ? true : false;
    db.get('transactions').find({id: id}).assign(transaction).write();

    res.redirect('/transactions')
}