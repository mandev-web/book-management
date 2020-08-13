const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

const booksRoutes = require('./routes/books.route');
const usersRoutes = require('./routes/users.route');
const transactionsRoutes = require('./routes/transactions.route');

app.set('view engine', 'pug')
app.set('views', './views')

//req.body phai dung cai nay
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index');
})
app.use('/books', booksRoutes);
app.use('/users', usersRoutes);
app.use('/transactions', transactionsRoutes);

app.listen(port, () => console.log('Server listening on 3000'))