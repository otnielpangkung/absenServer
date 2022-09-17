const { tokenGenerate, cekToken } = require("../helper/token")
const { User } = require("../models")


async function authenticate(req, res, next) {
    // console.log(req.headers);
    try {
        const { access_token } = req.headers
        // console.log(access_token);
        if (access_token) {
            // console.log("Teeees");
            const decoded = cekToken(access_token)
            // console.log(decoded, "============");
            let data = await User.findOne({
                where: {
                    username: decoded.username,
                    role: "staff"
                }
            });
            if (!data) {
                next({
                    name: "Authorization",
                    status: 401,
                    msg: "Unauthorize 1"
                })
            } else {
                req.loggedUser = decoded
                next()
            }
        } else {
            next({
                name: "Authorization",
                status: 401,
                msg: "Unauthorize 2"
            })
        }
    }
    catch (err) {
        next({
            name: "Authorization",
            status: 401,
            msg: "Unauthorize 3"
        })
    }
}

module.exports = authenticate