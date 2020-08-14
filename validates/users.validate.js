module.exports.addPost = function(req, res, next) {
    var errors = [];

    if(!req.body.name) errors.push("Name is required");
    if(!req.body.age) errors.push("Age is required");
    if(!req.body.mail) errors.push("Mail is required");
    if(!req.body.job) errors.push("Job is required");

    if (errors.length > 0) 
    {
        res.render('./users/add', {
            errors: errors,
            values: req.body
        })

        return;
    }

    next();
}