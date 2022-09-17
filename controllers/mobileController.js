const { Branch, Employee, Absen, TypeAbsen, User } = require('../models');
const { bcryptPass, cekPass } = require('../helper/bcrypt');
const { tokenGenerate, cekToken } = require('../helper/token');
const {Op} = require('sequelize')


const fs = require('fs')

const moment = require('moment')

class MobileController {
	static login(req, res) {
		console.log("Teeess");
		// console.log('masuk login', req.body.lokasi);
		Employee.findOne({
			where: {
				username: req.body.username,
			},
		})
			.then((data) => {
				console.log(data.password);
				if (data) {
					console.log(data.password);
					// let password = cekPass(req.body.password, data.password);
					// /cons/ole.log(password);
					if (data.password) {
						console.log("Tesss");
						let user = {
							username: data.username,
							id: data.id,
						};
						let access_token = tokenGenerate(user);
						res.status(200).json({
							id: data.id,
							username: data.username,
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
	static getEmployee(req,res) {
		Employee.findAll()
		.then(data => {
			res.status(200).json(data)
		})
		.catch(err => {
			res.status(404).json(err)
		})
	}
	static tesRout(req,res) {
		console.log('====================================');
		console.log("Teeess");
		console.log('====================================');
	}
	static addAbsen(req,res) {
		// console.log(req, "==========");
		console.log(req.file, "==========");
		// let thisTime = new Date()
		// let getTime = moment(thisTime).format('HH:MM')
		// let hourTime = +moment(thisTime).format('HH')
		// let dateTime = moment(thisTime).format('YYYY:MM:DD')

		// TypeAbsen.findOne({
		// 	where: {
		// 		BranchId: req.body.BranchId,
		// 		timeStart: {
		// 			[Op.gte]: hourTime,
		// 			[Op.lt]: hourTime 
		// 		}
		// 	}
		// }).then(data => {
		// 	Branch.findOne({
		// 		where: {
		// 			id: req.body.BranchId
		// 		}
		// 	}).then(data5 => {
		// 		if((+req.body.latitude + 0.0001) >= +data5.latitude && (+req.body.latitude - 0.0001) <= +data5.latitude && 
		// 		(+req.body.longitude + 0.0001) >= +data5.longitude && (+req.body.longitude - 0.0001) <= +data5.longitude) {
		// 			console.log("Berada di Lokasi");
		// 			if(!data) {
		// 				return res.status(401).json({msg : "Waktu Absen Anda Tidak Ditemukan"})
		// 			} else {
		// 				console.log("Masuk Jam Absen");
		// 				Absen.findOne({
		// 					where: {
		// 						TypeAbsenId: data.id,
		// 						EmployeeId: req.body.EmployeeId,
		// 						date: dateTime,
		// 					}
		// 				})
		// 				.then(data2 => {
		// 					if(data2) {
		// 						res.status(401).json({msg : "Anda Telah Melakukan Absen"})
		// 					}
		// 					else {
								
		// 						console.log("Absen Belum ada, silahkan lanjut record Absen");
		// 						Absen.create({
		// 							TypeAbsenId: data.id,
		// 							EmployeeId: req.body.EmployeeId,
		// 							date: dateTime,
		// 							absenPic: req.files.filename,
		// 							BranchId: req.body.BranchId,
		// 							time: getTime,
		// 							amount : data.amount
		// 						})
		// 						.then(data3 => {
		// 							res.status(200).json({
		// 								data: data3,
		// 								msg: "Data Berhasil diTambahkan"})
		// 						})
		// 						.catch(err => {
		// 							res.status(401).json(err)
		// 						})
		// 					}
		// 				})
		// 				.catch(err => {
		// 					res.status(401).json(err)
		// 				})
		// 			}
		// 		} else {
		// 			return res.status(401).json({msg : "Anda tidak berada di Lokasi"})
		// 		}
		// 	}).catch(err => {
		// 		res.status(401).json(err)
		// 	})	
		// })
		// .catch(err => {
		// 	res.status(401).json(err)
		// })		
	}

	// static addAbsen(req,res) {
	// 	console.log(req.files, "=======================");
	// 	console.log(req.file.filename, "++=======================");
	// 	console.log(req.body, "------------");
	// 	TypeAbsen.findOne({
	// 		where: {
	// 			id: req.body.addTypeAbsenId				
	// 		}
	// 	}).then(data => {
	// 		Absen.create({
	// 			EmployeeId: req.body.addEmployeeId,
	// 			BranchId: data.addBranchId,
	// 			TypeAbsenId: data.addTypeAbsenId,
	// 			date: req.body.date,
	// 			time: req.body.time,
	// 			detail: req.body.detail,
	// 			typeInput: "manual",
	// 			amount: data.amount,
	// 		}).then(data => {
	// 			res.status(200).json(data)
	// 		})
	// 		.catch(err => {
	// 			res.status(404).json(err)
	// 		})

	// 	}).catch((err) => {
	// 		res.status(500).json(err);
	// 	});

	// }
}

module.exports = MobileController;
