require('dotenv').config();

//console.log(process.env.COOKIE_SECRET)
//console.log(process.env.SENDGRID_API_KEY)
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const booksRoutes = require('./routes/books.route');
const usersRoutes = require('./routes/users.route');
const transactionsRoutes = require('./routes/transactions.route');
const authRoutes = require('./routes/auth.route');

const authMiddleware = require('./middleware/auth.middleware');

app.set('view engine', 'pug')
app.set('views', './views')

//req.body phai dung cai nay
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.static('public'));

app.get('/', authMiddleware.requireAuth, function(req, res) {
    /*const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
    to: 'nman.vn@gmail.com',
    from: 'nnman.vn@gmail.com',
    subject: 'Your password has been changed',
    text: 'Because of wrong password, so we changed your password',
    html: '<strong>Because of wrong password, so we changed your password</strong>',
    };
    sgMail.send(msg);*/
        res.render('index');
})
app.use('/books', booksRoutes);
app.use('/users', usersRoutes);
app.use('/transactions', transactionsRoutes);
app.use('/auth', authRoutes);
// test mail api
/*var unirest = require("unirest");

var req = unirest("POST", "/");

req.headers({
	"x-rapidapi-host": "fapimail.p.rapidapi.com",
	"x-rapidapi-key": "a4f6c375b6msh6a444704027612dp191cb2jsne2f77152ee6d",
	"content-type": "application/json",
	"accept": "application/json",
	"useQueryString": true
});

req.type("json");
req.send({
	"recipient": "nman.vn@email.com",
	"sender": "nnman.vn@email.com",
	"subject": "Hello",
	"message": "loremasdsad sadsadsadadeade dasdas dsdadsad"
});

req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});*/
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

app.listen(port, () => console.log('Server listening on 3000'))