const { Branch, Employee, Absen, TypeAbsen, User, Sequelize } = require('../models');
const moment = require('moment');
const { bcryptPass, cekPass } = require('../helper/bcrypt');
const { tokenGenerate, cekToken } = require('../helper/token');
const absen = require('../models/absen');
const {Op} = require('sequelize')


class WebController {
	// user
	static login(req, res) {
		console.log('masuk login', req.body);
		User.findOne({
			where: {
				username: req.body.username,
			},
		})
			.then((data) => {
				if (data) {
					let password = cekPass(req.body.password, data.password);
					if (password) {
						// console.log("Tesss");
						let user = {
							username: data.username,
							id: data.id,
							fullname: data.fullname
						};
						let access_token = tokenGenerate(user);
						res.status(200).json({
							id: data.id,
							username: data.username,
							// fullname: data.fullname,
							access_token: access_token,
						});
						// res.status(200).json(data)
					} else {
						res.status(401).json({ msg: 'poaswword/username salah' });
					}
				} else {
					res.status(401).json({ msg: 'poaswword/username salah' });
				}
			})
			.catch((err) => {
				res.status(401).json({ msg: 'poaswword/username salah 2' });
			});
	}
	static getAllUser(req, res) {
		console.log(req.loggedUser,"========");
		User.findAll()
			.then((data) => {
				let hasil = [];
				data = data.map((e) => {
					delete e.password;
					hasil.push(e);
				});
				res.status(200).json(hasil);
			})
			.catch((err) => {
				res.status(401).json(err);
			});
	}
	static addUser(req, res) {
		console.log(req.body);
		User.create({
			fullname: req.body.fullname,
			username: req.body.username,
			password: req.body.password,
		})
			.then((data) => {
				res.status(200).json({ msg: 'User berhasil ditambahkan', data: data });
			})
			.catch((err) => {
				console.log('tess');
				res.status(401).json(err);
			});
	}
	static changePassword(req,res) {
		console.log( req.loggedUser.id, req.body.password, "=======");
		User.update({
			password: bcryptPass(req.body.password)
		}, {
			where: {
				id: req.loggedUser.id
			}
		}).then((data) => {
			res.status(200).json({ msg: 'User berhasil Diubah', data: data });
		})
		.catch((err) => {
			res.status(401).json(err);
		});
	}
	static deleteUser(req, res) {
		User.destroy({
			where: {
				id: req.params.id,
			},
		})
			.then((data) => {
				res.status(200).json({ msg: 'User berhasil dihapus', data: data });
			})
			.catch((err) => {
				res.status(401).json(err);
			});
	}
	// Employee
	static getTableEmployee(req, res) {
		console.log(req.query.page, "====");
		Employee.findAll({
			attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
			order: [['id', 'desc']]
		}).then((data) =>  {

			let dataLength = data.length;
			const startIndex = (req.query.page - 1) * req.query.limit;
			const endIndex = req.query.page * req.query.limit;
			const result = data.slice(startIndex, endIndex);
			res.status(200).json({
				data2: {
					result,
					dataLength,
				},
			});
		})
		.catch((err) => {
			res.status(401).json(err);
		});
	}

	static getEmployees(req, res) {
		// console.log("=========================");
		// tanpa pagenation
		Employee.findAll({
			attributes: { exclude: ['password'] },
			order: [['id', 'desc']]
		}).then(data => {
			// console.log(data);
			res.status(200).json(data)
		})
		.catch(err => {
			res.status(200).json(err)
		})
			
	}

	static addEmployee(req, res) {
		console.log("Yeesss");
		Employee.create({
			employeeName: req.body.employeeName,
			position: req.body.position,
			username: req.body.username,
			// password: bcryptPass(req.body.password),
			password: req.body.password,
			status: req.body.status,
		})
			.then((data) => {
				res
					.status(200)
					.json({ msg: 'Karyawan berhasil ditambahkan', data: data });
			})
			.catch((err) => {
				res.status(401).json(err);
			});
	}
	static deleteEmployeee(req, res) {
		Absen.destroy({
			where: {
				EmployeeId: req.params.id,
			},
		}).then((data) => {
			return Employee.destroy({
				where: {
					id: req.params.id,
				},
			})
				.then((data) => {
					res
						.status(200)
						.json({ msg: 'Employee berhasil dihapus', data: data });
				})
				.catch((err) => {
					res.status(401).json(err);
				});
		});
	}

	static editEmployee(req,res) {
		Employee.update({
			employeeName: req.body.employeeName,
			position: req.body.position,
			username: req.body.username,
		}, {
			where: {
				id: req.params.id
			}
		}).then((data) => {
			res
				.status(200)
				.json({ msg: 'Employee berhasil Dibuah' });
		})
		.catch((err) => {
			res.status(500).json(err);			
		})
			
	}
	// Absen

	static getBranchAbsen(req, res) {
	// menampilkan rekap absen sebulan dari tiap cabang
	// console.log(req.query);
	let month = req.query.month
	let year = req.query.year
		Absen.findAll({
			include: [Employee],
			attributes:{ exclude: ['typeInput','realLocation','absenPic','detail']},
			where: {
				BranchId: req.query.BranchId
			}
		})
		.then(data => {
			// console.log(data, "==============");
			let penm = []
			let total = 0
			data?.map(e => {
				if(month == moment(e.date).format("MM") && year == moment(e.date).format("YYYY") && e.statusAbsen == 'setuju') {
					total += e.amount
					penm.push(e)
				}
			})
			let penampung = []
			penm?.map(e => {
				let y = 0
				penampung.map(x => {
					// console.log(x, "==============");
					if(e.EmployeeId == x.EmployeeId) {
						if(e.statusAbsen == 'setuju') {
							x.amount += e.amount
						}
						y++
						x.count++
					}
				})
				if(y == 0) {
					e['count'] = 1;
					penampung.push(e)
				}
			})
			// console.log(penampung[0].count);
			let dataLength = penampung.length;
			const startIndex = (req.query.page - 1) * req.query.limit;
			const endIndex = req.query.page * req.query.limit;
			const result = penampung.slice(startIndex, endIndex);
				res.status(200).json({
				total, result, dataLength
			})
		})
		.catch(err => {
			res.status(200).json(err)
		})
	}

	static getUserAbsen(req, res) {
		console.log(req.query);
		let month = req.query.month
		let year = req.query.year
		Absen.findAll({
			include: [TypeAbsen,Branch],
			where: {
				EmployeeId: req.query.EmployeeId
			}
		}).then(data => {
			let penm= []
			let total = 0
			let kehadiran = 0
			// console.log(data);
			data?.map(e => {
				if(month == moment(e.date).format("MM") && year == moment(e.date).format("YYYY")) {
					if(e.status == "setuju") {
						total += e.amount
					}
					penm.push(e)
				}
			})
			kehadiran = penm.length
			// console.log(kehadiran,"===");
			let dataLength = kehadiran;
			const startIndex = (req.query.page - 1) * req.query.limit;
			const endIndex = req.query.page * req.query.limit;
			const result = penm.slice(startIndex, endIndex);
				res.status(200).json({
				total, result, dataLength
			})
		})
	}
	static	addManualAbsen(req,res) {
		// untuk tambahkan absen secara manual
		console.log(req.body);
		TypeAbsen.findOne({
			where: {
				id: req.body.addTypeAbsenId
			}
		})
		.then(data => {
			console.log(data.amount);
			console.log("Yayaya");
			console.log( req.body.detail, 
				//  req.body.detail,
				
				//  data.id
			);
			Absen.create({
				EmployeeId: req.body.addEmployeeId,
				BranchId: req.body.addBranchId,
				TypeAbsenId: req.body.addTypeAbsenId,
				date: req.body.date,
				time: req.body.time,
				detail: req.body.detail,
				typeInput: "manual",
				amount: data.amount,
			}).then(data => {
				console.log("yes");
				res.status(200).json(data)
			}).catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});

		}).catch((err) => {
			res.status(500).json(err);
		});
		
	}
	static changeStatusAbsen(req, res) {
		console.log("============");
		console.log(req.params.id);
		Absen.findOne({
			where: {
				id: req.params.id
			}
		}).then(data => {
			let penm = 'ditolak'
			if (data.statusAbsen == 'ditolak') {
				penm = 'setuju'
			} 
			Absen.update({
				statusAbsen: penm
			}, {
				where: {
					id: data.id
				}
			}).then(data => {
				res.status(200).json(data)
			}).catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
		})
	}
	// Branch
	static getBranch(req, res) {
		Branch.findAll()
		.then(data => {
			res.status(200).json(data)
		}).catch((err) => {
			res.status(401).json(err);
		});
	}

	static addBranch(req, res) {
		Branch.create({
			branchName: req.body.branchName,
			rekNumber: req.body.rekNumber,
			latitude: req.body.latitude,
			longitude: req.body.longitude,
			detail: req.body.detail,
		}).then((data) => {
			res.status(200).json({ msg: 'Cabang berhasil ditambahkan', data: data });
		})
		.catch((err) => {
			res.status(401).json(err);
		});
	}
	static getOneBranch(req,res) {
		Branch.findOne({
			where: {
				id: req.params.id
			}
		})
		.then(data => {
			res.status(200).json(data)
		}).catch((err) => {
			res.status(500).json(err);
		});
	}

	static deleteBranch(req,res) {
		Branch.findOne({
			include: [Absen, TypeAbsen],
			where: {
				id: req.params.id
			}
		}).then(data => {
			if(data.Absens.length > 0 || data.TypeAbsens.length > 0) {
				res.status(500).json({msg : "Cek Kembali data anda"});
			} else {
				return Branch.destroy({
					where: {
						id: req.params.id					
					}
				}).then(data => {
					res.status(200).json({msg : "Data berhasil dihapus"})
				}).catch(err => {
					res.status(500).json(err);				
				})
			}
		}).catch(err => {
			res.status(500).json(err);				
		})
	}

	static editBranch(req,res) {
		console.log(req.body.longtitude, "==================");
		Branch.update({
			branchName: req.body.branchName,
			longtitude: req.body.longtitude,
			latitude: req.body.latitude,
			rekNumber: req.body.rekNumber,
		}, {
			where: {
				id: +req.params.id
			}
		})
		.then(data => {
			res.status(200).json(data)
		}).catch((err) => {
			res.status(500).json(err);
		})
	}
	// typeAbsen
	static getTypeAbsen(req,res) {
		// console.log("yes");
		TypeAbsen.findAll({
			order: [['BranchId', 'asc']],
			include: Branch
		}).then(data => {
			res.status(200).json(data)
		}).catch((err) => {
			// console.log(err);
			res.status(500).json(err);
		})
	}
	static getTableTypeAbsen(req,res) {
		console.log(req.query);
		TypeAbsen.findAll({
			order: [['BranchId', 'asc']],
			include: [Branch]
		}).then(data => {
			let dataLength = data.length;
			const startIndex = (req.query.page - 1) * req.query.limit;
			const endIndex = req.query.page * req.query.limit;
			const result = data.slice(startIndex, endIndex);
			res.status(200).json({
				data2: {
					result,
					dataLength,
				},
			});
		}).catch((err) => {
			// console.log(err);
			res.status(500).json(err);
		})
	}
	static addTypeAbsen(req,res) {
		console.log(req.body);
		TypeAbsen.findAll({
			where: {
				BranchId: req.body.BranchId,
			}
		}).then(data => {
			let x = 0
			data.map(e => {
				// console.log(req.body.timeStart , e.timeStart , req.body.timeEnd , e.timeEnd);
				if((req.body.timeStart >= e.timeStart && req.body.timeEnd <= e.timeEnd) || (
					req.body.timeStart <= e.timeStart && req.body.timeEnd >= e.timeStart) || (
					req.body.timeStart <= e.timeEnd && req.body.timeEnd >= e.timeEnd) || (
					req.body.timeStart <= e.timeStart && req.body.timeEnd >= e.timeEnd
					)) {
					console.log(x, "===");
					x += 1
				}
			})
			console.log(x);
			if(x == 0) {
				console.log("----ss");
				TypeAbsen.create({
					typeName: req.body.typeName,
					BranchId: req.body.BranchId,
					timeStart: req.body.timeStart,
					timeEnd: req.body.timeEnd,
					amount: req.body.amount
				}).then(data => {
					console.log("Berhasil");
					res.status(200).json(data)
				}).catch((err) => {
					console.log(err);
					res.status(500).json(err);
				})
			} else {
				res.status(500).json({msg: "Gagal"});
			}
		})

	}
	static editTypeAbsen(req, res) {
		TypeAbsen.findOne(
			{
				typeName: req.body.typeName,
				BranchId: req.body.BranchId,
				amount: req.body.amount
			}, {
			where: {
				id: req.params.id,
				
			}
		}).then(data => {
			console.log(data);
			res.status(200).json(data)
		}).catch((err) => {
			console.log(err);
			res.status(500).json(err);
		})
	}
}

module.exports = WebController;
