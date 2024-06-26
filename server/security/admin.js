function checkAdmin(req, res, next) {
    if (res.locals.role == "USER")
        res.sendStatus(401)
    else
        next()
}

module.exports = { checkAdmin: checkAdmin }