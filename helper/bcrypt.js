const bcrypt = require("bcryptjs")

function bcryptPass(password) {

    var salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt);
}

function cekPass(pass, passDB) {
    return bcrypt.compareSync(pass, passDB);
}

module.exports = { bcryptPass, cekPass }