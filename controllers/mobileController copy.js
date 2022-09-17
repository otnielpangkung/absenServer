const { Branch, Employee, Absen, TypeAbsen, User } = require('../models');
const { bcryptPass, cekPass } = require('../helper/bcrypt');
const { tokenGenerate, cekToken } = require('../helper/token');
const {Op} = require('sequelize')
const fs = require('fs')

const moment = require('moment')

class MobileController {
	static login(req, res) {
		// console.log('masuk login', req.body);
		Employee.findOne({
			where: {
				username: req.body.username,
			},
		})
			.then((data) => {
				console.log(data.password);
				if (data) {
					let password = cekPass(req.body.password, data.password);
					console.log(password);
					if (password) {
						// console.log("Tesss");
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

	static addAbsen(req,res) {
		console.log("+--+-+-+-+-+-")
		console.log(req.files, "=======================");
		console.log(req.file, "++=======================");
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
		// 		if((+req.body.latitude + 0.0001) >= +data5.latitude &&
		// 		(+req.body.latitude - 0.0001) <= +data5.latitude &&
		// 		(+req.body.longitude + 0.0001) >= +data5.longitude &&
		// 		(+req.body.longitude - 0.0001) <= +data5.longitude) {
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
		// 							absenPic: req.body.absenPic,
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
}

module.exports = MobileController;
