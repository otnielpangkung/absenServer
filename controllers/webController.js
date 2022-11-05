const { Branch, Employee, Absen, TypeAbsen, User, Sequelize } = require('../models');
const moment = require('moment');
const { bcryptPass, cekPass } = require('../helper/bcrypt');
const { tokenGenerate, cekToken } = require('../helper/token');
const absen = require('../models/absen');
const {Op} = require('sequelize')
const fs = require("fs")

class WebController {
	// user
	static login(req, res) {
		console.log("tess");
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
						console.log("Tesss");
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
		User.findAll({
			attributes: { exclude: ['password', 'createdAt', 'updatedAt']},
		})
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
		Employee.findAll({
			attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
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
	static async deleteEmployeee(req, res) {

		Absen.destroy({
			where: {
				EmployeeId: req.params.id,
			},
		}).then((data) => {
			Employee.destroy({
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
		console.log("eee");
		Employee.update({
			employeeName: req.body.employeeName,
			position: req.body.position,
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

	static async resetPassEmployee(req,res) {

		try {
			let data = await Employee.update({
				password: "admin123"
			}, {
				where: {
					id: req.params.id
				}
			})

			return res.status(200).json({ msg: 'Employee berhasil Dibuah' });

		} catch(err) {
			console.log(err);
			res.status(500).json(err);	
		}

	}

	// Absen
	static async getAllAbsen(req,res) {

		try {
			let data = await Absen.findAll({
				include: [
					{
						model: Employee,
						attributes:{ exclude: ['createdAt','password','username','status', 'updatedAt']},
					},
					{
						model: Branch,
						attributes:{ exclude: ['createdAt', 'updatedAt','rekNumber','latitude','longitude' ]},
					},
				],
				attributes:{ exclude: ['createdAt', 'updatedAt']},
	
			})
	
			if(req.query.BranchId > 0) {
				data = data.filter(e => e.BranchId == req.query.BranchId)
			}
			if(req.query.EmployeeId > 0) {
				data = data.filter(e => e.EmployeeId == req.query.EmployeeId)
			}
			if(req.query.startDate || req.query.endDate) {
				data = data.filter(e => e.date <= req.query.endDate && e.date >= req.query.startDate)
			} 
			let dataLength = data.length;
			const startIndex = (req.query.page - 1) * req.query.limit;
			const endIndex = req.query.page * req.query.limit;
			const result = data.slice(startIndex, endIndex);
				return res.status(200).json({
				total, result, dataLength
			})
			
		}catch(err) {
			console.log(err);
			return es.status(500).json(err)
		}
	}

	static getBranchAbsen(req, res) {
	// menampilkan rekap absen sebulan dari tiap cabang
	console.log(req.query);
	let month = req.query.month
	let year = req.query.year
		Absen.findAll({
			include: [Employee],
			attributes:{ exclude: ['typeInput','realLocation','absenPic','detail','createdAt', 'updatedAt']},

		})
		.then(data => {

			if(req.query.BranchId > 0) {
				data = data.filter(e => e.BranchId == req.query.BranchId)
			}
			// console.log(data, "==============");
			let penm = []
			let total = 0
			data.map(e => {
				if(month == moment(e.date).format("MM") && year == moment(e.date).format("YYYY") && e.statusAbsen == 'setuju') {
					total += e.amount
					penm.push(e.dataValues)
				}
			})
			// console.log(penm);
			let penampung = []
			for(let i = 0; i < penm.length; i++) {
				let flag = false
				for(let j=0; j < penampung.length; j++) {
					if(penampung[j].EmployeeId == penm[i].EmployeeId) {
						if(penm[i].statusAbsen == 'setuju') {
							flag = true
							penampung[j].amount += penm[i].amount
							penampung[j].count++
							break
						}
					}
				}
				if(!flag) {
					penm[i].count = 1
					penampung.push(penm[i])
				}
			}
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
			res.status(500).json(err)
		})
	}

	static getUserAbsen(req, res) {
		// console.log(req.query.UserId, "====");
		// console.log(req.query.year,"--=----");
		let month = req.query.month
		let year = req.query.year
		Absen.findAll({
			include: [TypeAbsen,Branch],
			attributes: { exclude: ['createdAt', 'updatedAt'] },
			where: {
				EmployeeId: req.query.EmployeeId
			}
		}).then(data => {
			let penm= []
			let total = 0
			let kehadiran = 0
			data.map(e => {
				if( +year == +moment(e.date).format("YYYY")) {
					console.log(moment(e.date).format("YYYY"));
				}
				if(month == moment(e.date).format("MM") && year == moment(e.date).format("YYYY")) {
					if(e.statusAbsen == "setuju") {
						total += e.amount
					}
					penm.push(e)
				}
			})
			kehadiran = penm.length
			console.log(total, "total");
			// console.log(kehadiran,"===");
			let dataLength = kehadiran;
			const startIndex = (req.query.page - 1) * req.query.limit;
			const endIndex = req.query.page * req.query.limit;
			const result = penm.slice(startIndex, endIndex);
				res.status(200).json({
				total, result, dataLength
			})
		}).catch(err => {
			console.log(err);
			res.status(500).json(err)
		})
	}
	static	addManualAbsen(req,res) {
		let x = 0
		// untuk tambahkan absen secara manual
		console.log(req.body);
		TypeAbsen.findOne({
			where: {
				id: req.body.addTypeAbsenId
			}
		})
		.then(data => {
			TypeAbsen.findOne({
				where: {
					id: req.body.addTypeAbsenId
				}
			}).then(data2 => {
				// if(req.body.time < data2.timeStart || req.body.time > data2.timeEnd) {
					// 	console.log("gagagaaaalll");
					// 	return res.status(401).json({msg: "Periksa Kembali data anda"})
					// }
				Absen.findAll({
					where: {
						date: req.body.date,
						EmployeeId: req.body.addEmployeeId,
					}
				}).then(data3 => {
					// console.log(data3,"data3");
					data3.map(e => {
						if(e.time > data2.timeStart && e.time < data2.timeEnd) {
							console.log("gagaaal");
							return res.status(401).json({msg: "Periksa Kembali data anda"})
							// return res.status(401).json({msg: "Periksa Kembali data anda"})
						}
					})
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
				}).catch(err => {
					console.log(err, "1");
					res.status(500).json(err);
				})
			})
			.catch(err => {
				console.log(err);
				res.status(500).json(err);
			})
		}).catch((err) => {
			res.status(500).json(err);
		});
		
	}
	static changeStatusAbsen(req, res) {
		console.log("+++");
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
		let id = 0
		TypeAbsen.findAll({
			order: [['id','desc']]
		})
		.then(data => {
			id = data[0].id+1
		})
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
					// id: id,
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
		}).catch(err => {
			console.log(err);
			res.status(401).json(err)
		})

	}
	static async editTypeAbsen(req, res) {
		
		try {
			if(req.body.timeStart > req.body.timeEnd) {
				throw {
					status: 500,
					msg: "Periksa Kembali data anda"
				}
			}

			
			let data = await TypeAbsen.findAll({
	
				where: {
					BranchId: req.body.BranchId,
				}
			})
	
			data = await data.filter(e =>(req.body.timeStart >= e.timeStart && req.body.timeEnd <= e.timeEnd) || (
				req.body.timeStart <= e.timeStart && req.body.timeEnd >= e.timeStart) || (
				req.body.timeStart <= e.timeEnd && req.body.timeEnd >= e.timeEnd) || (
				req.body.timeStart <= e.timeStart && req.body.timeEnd >= e.timeEnd
				))
			data = await  data.filter(e => e.id != req.params.id)
			if(data.length > 0) {
				return res.status(500).json({msg: "Anda Tidak dapat menambahkan data"})
			}

			let data2 = await  TypeAbsen.update(
					{
						typeName: req.body.typeName,
						BranchId: req.body.BranchId,
						amount: req.body.amount,
						timeStart: req.body.timeStart,
						timeEnd: req.body.timeEnd,
					}, {
					where: {
						id: req.params.id,
						
					}}
			)

			return res.status(200).json({msg: "Anda Berhasil mengupdate data"})
 
		} catch (err) {
			console.log(err);
			return res.status(500).json({msg: "Anda Tidak dapat menambahkan data"})
		}
	}
	static deleteTypeAbsen(req,res) {
		Absen.destroy({
			where: {
				TypeAbsenId: req.params.id
			}
		}).then(data => {
			TypeAbsen.destroy({
				where: {
					id: req.params.id
				}
			}).then(data => {
				res.status(201).json({msg: "Berhasil"})
			}).catch(err => {
				res.status(500).json(err)
			})
		}).catch(err => {
			console.log(err);
			res.status(500).json(err)
		})
	}
	static deletePhoto(req,res) {
		let thisDate = new Date()
		let nowDate = moment(thisDate).format("YYYY-MM-DD")
		let lessDate = thisDate.setDate(thisDate.getDate() - 45)
		// let lessDate = thisDate.setDate(thisDate.getDate())
		lessDate= moment(lessDate).format("YYYY-MM-DD") 
		let penm = []
		Absen.findAll()
		.then(data => {
			// console.log("yeeeees deleted");
			data.map(e => {
				if(e.absenPic != null && e.date <= lessDate) {
					console.log(e.absenPic);
					fs.unlinkSync(`./uploads/${e.absenPic}`)
					Absen.update({
						absenPic: null
					}, {
						where: {
							id: e.id
						}
					})
				}
			})
			// console.log(data);
		}).catch(err => {
			console.log(err);
			res.status(400).json(err)
		})

	}

	// Print

	static branchAbsenPrint(req,res) {
		let month = req.query.month
		let year = req.query.year
		Absen.findAll({
			attributes:{ exclude: ['typeInput','realLocation','absenPic','detail','createdAt','updatedAt' ]},
			where: {
				BranchId: req.query.BranchId
			},
			include: [
				{
					model: Employee,
					attributes: {exclude: ['createdAt', 'updatedAt', 'password', 'status']}
				},
				{
					model: Branch,
					attributes: {exclude: ['createdAt', 'updatedAt','rekNumber', 'latitude', 'longitude','detail']}
				}
			],
		})
		.then(data => {
			// console.log(data, "==============");
			let penm = []
			let total = 0
			data.map(e => {
				if(month == moment(e.date).format("MM") && year == moment(e.date).format("YYYY") && e.statusAbsen == 'setuju') {
					total += e.amount
					penm.push(e.dataValues)
				}
			})
			// console.log(penm);
			let penampung = []
			for(let i = 0; i < penm.length; i++) {
				let flag = false
				for(let j=0; j < penampung.length; j++) {
					if(penampung[j].EmployeeId == penm[i].EmployeeId) {
						if(penm[i].statusAbsen == 'setuju') {
							flag = true
							penampung[j].amount += penm[i].amount
							penampung[j].count++
							break
						}
					}
				}
				if(!flag) {
					penm[i].count = 1
					penampung.push(penm[i])
				}
			}
			let result = []
			penampung.map(e => {
				let s = {
					'Nama Pegawai' : e.Employee.employeeName,
					Posisi: e.Employee.position,
					Kehadiran: e.count,
					Jumlah: e.amount
				}
				result.push(s)
			})
				res.status(200).json(result)
		})
		.catch(err => {
			res.status(500).json(err)
		})
	}
	static employeeAbsenPrint(req,res) {
		let month = req.query.month
		let year = req.query.year
		Absen.findAll({
			order: [['date','desc'],['id','asc']],
			attributes: { exclude: ['createdAt', 'updatedAt'] },
			where: {
				EmployeeId: req.query.EmployeeId
			},
			include: [
				{
					model: TypeAbsen,
					attributes: {exclude: ['createdAt', 'updatedAt','BranchId','amount','timeStart', 'timeEnd',]}
				},
				{
					model: Branch,
					attributes: {exclude: ['createdAt', 'updatedAt','longitude','latitude','detail','rekNumber']}
				},
				{
					model: Employee,
					attributes: {exclude: ['createdAt', 'updatedAt', 'password','position','status']}
				},
				
			],
		}).then(data => {
			let result = []
			let penm= []
			let total = 0
			let kehadiran = 0
			data.map(e => {
				if( +year == +moment(e.date).format("YYYY")) {
				}
				if(month == moment(e.date).format("MM") && year == moment(e.date).format("YYYY")) {
					if(e.statusAbsen == "setuju") {
						total += e.amount
					}
					penm.push(e)
				}
			})
			penm.map(e => {
				
				let a = {
					'Nama Pegawai' : e.Employee.employeeName,
					tanggal: e.date,
					Lokasi: e.Branch.branchName,
					'Jenis Absen': e.TypeAbsen.typeName,
					'Jam Absen': e.time

				}
				result.push(a)
			})

			kehadiran = penm.length

			let dataLength = kehadiran;
				res.status(200).json(result)
		}).catch(err => {
			console.log(err);
			res.status(500).json(err)
		})
	}

}



module.exports = WebController;
