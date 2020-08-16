var db = require('../db');

module.exports.index = function(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 9;
    var begin = (page-1)*perPage;
    var end = page* perPage;
    res.render('./products/index', {
        products: db.get('products').value().slice(begin,end),
        page: page
    })
}