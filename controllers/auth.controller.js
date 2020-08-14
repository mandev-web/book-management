var db = require('../db');
const shortid = require('shortid');
const bcrypt =  require('bcrypt');

module.exports.loginGet = function(req, res) {
    res.render('./auth/login', {
        users: db.get('users').value()
    })
}
module.exports.loginPost = function(req, res) {
    var user = req.body;
    var userCheck = db.get('users').find({mail: user.mail}).value();
    if (!userCheck) {
        res.render('./auth/login', {
            errors: [
                "User doesn't exist."
            ],
            values: req.body
        })

        return;
    }
    bcrypt.compare(req.body.password, userCheck.password, function(err, result) {

        if(userCheck.wrongLoginCount >= 4) {
            res.render('./auth/login', {
                errors: [
                    "You can not login. Please contact admin to unlock your account"
                ]
            })
            return;
        }
        if (result == false) {
            userCheck.wrongLoginCount += 1;
            console.log(userCheck.wrongLoginCount);
            db.get('users').find({mail: userCheck.mail}).assign(userCheck).write();
            res.render('./auth/login', {
                errors: [
                    "Wrong password !!"
                ],
                values: req.body
            })
            
            return;
        }
         res.cookie('userId', userCheck.id, {
             signed: true
         });
         res.redirect('/');
    })
    
}