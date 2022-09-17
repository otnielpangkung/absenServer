const { tokenGenerate, cekToken } = require('../helper/token');
const { User } = require('../models');

async function AdminAutenticate(req, res, next) {
	try {
		const { access_token } = req.headers;
		if (access_token) {
			const decoded = cekToken(access_token);
			let data = await User.findOne({
				where: {
					username: decoded.username,
				},
			});
			if (!data) {
				next({
					name: 'Authorization',
					status: 401,
					msg: 'Unauthorize 1',
				});
			} else {
				req.loggedUser = decoded;
				next();
			}
		} else {
			next({
				name: 'Authorization',
				status: 401,
				msg: 'Unauthorize 2',
			});
		}
	} catch (err) {
		next({
			name: 'Authorization',
			status: 401,
			msg: 'Unauthorize 3',
		});
	}
}

module.exports = AdminAutenticate;
