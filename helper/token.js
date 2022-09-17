const jwt = require("jsonwebtoken")

function tokenGenerate(user) {
    var token = jwt.sign(user, "bebas")
    return token
}

function cekToken(token) {
    return jwt.verify(token, "bebas")
}

module.exports = { tokenGenerate, cekToken }