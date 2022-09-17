const { tokenGenerate, cekToken } = require("../helper/token")
const { User } = require("../models")

async function userAuthorization(req, res, next) {
    try {
        // mencari di header yang berisi access_token, access token sudah terisi sewaktu login
        const { access_token } = req.headers
        // console.log(access_token);
        if (access_token) {
            // decoded berisi seluruh access_token yang di generate,, jadi apa sj yang isi acceess_token bisa dipakai
            const decoded = cekToken(access_token)
            // console.log(decoded);
            let data = await User.findOne({
                where: {
                    username: decoded.username,
                    // role: "bendahara"
                }
            });
            if (!data) {
                next({
                    name: "Authorization",
                    status: 401,
                    msg: "Unauthorize"
                })
            } else {
                // set decodedd menjadi req.costumer.. yang bisa dipakai, contoh di addTodo, dipakai untuk autoo incrament
                req.loggedUser = decoded

                // console.log(req.loggedUser, "req.costumer");
                next()
            }
        } else {

            next({
                name: "Authorization",
                status: 401,
                msg: "Unauthorize"
            })
        }
    }
    catch (err) {
        next({
            name: "Authorization",
            status: 401,
            msg: "Unauthorize"
        })
    }
}

module.exports = userAuthorization