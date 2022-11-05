const { Branch, Employee, Absen, TypeAbsen, User } = require('../models');
const { bcryptPass, cekPass } = require('../helper/bcrypt');
const { tokenGenerate, cekToken } = require('../helper/token');
const {Op} = require('sequelize')


const fs = require('fs')

const moment = require('moment')

class MobileController {
	static login(req, res) {
		// console.log('masuk login', req.body.lokasi);
		Employee.findOne({
			where: {
				username: req.body.username,
			},
		})
			.then((data) => {
				if (data) {
					// console.log(data.password);
					// let password = cekPass(req.body.password, data.password);
					// /cons/ole.log(password);
					if (data.password) {
						let user = {
							username: data.username,
							id: data.id,
						};
						let access_token = tokenGenerate(user);
						console.log(access_token);
						res.status(200).json({
							id: data.id,
							username: data.username,
							access_token: access_token,
						});
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
	static async addAbsen(req,res) {
		
		try {
			console.log("Masuuuk mobil");
			let barcode = JSON.parse(req.body.barcode)
			let lokasi = JSON.parse(req.body.lokasi)
			let id = +JSON.parse(req.body.id)
			let thisTime = new Date()
			let getTime = moment(thisTime).format('HH:mm')
			let dateTime = moment(thisTime).format('YYYY-MM-DD')

			let data = await Branch.findOne({
				where: {
					id: barcode.id
				}
			})
			if(!data) {
				// console.log("44");
				throw {
					status: 500,
					msg: "Lokasi Tidak Ditemukan"
				}
			}  else if(data && ((+lokasi.latitude + 0.003) >= +data.latitude && (+lokasi.latitude - 0.003) <= +data.latitude && 
            (+lokasi.longitude + 0.0003) >= +data.longitude && (+lokasi.longitude - 0.0003) <= +data.longitude)) {
				
				let data2 = await TypeAbsen.findAll({
					where: {
						BranchId: data.id
					}
				})
				// console.log(data2,"==data2");
				let penm = data2.filter(e => (e.timeStart <= getTime && e.timeEnd >= getTime))
				console.log(penm);
				
				let data99 = await Absen.findAll({
                    where: {
                        EmployeeId: id,
                        date: dateTime
                    }
                })
				data99.map(e => {
					if(e.time >= penm[0].timeStart && e.time <= penm[0].timeEnd) {
						
						throw {
							status: 500,
							msg: "Sudah Melakukan Absen"
						}
					}
				})
				if(penm.length < 1) {
					throw {
						status: 500,
						msg: "Waktu Absen Tidak Ditemukan"
					}
                } 
				// let data3 = await Absen.findAll({
				// 	where: {
				// 		BranchId: data.id,
				// 		TypeAbsenId: penm[0].id,
				// 		EmployeeId: id
				// 	}
				// })
				// let penm2 = data3.filter(e => (e.date == dateTime))
				// if(penm2.length >= 1) {
				// 	throw {
				// 		status: 500,
				// 		msg: "Sudah Melakukan Absen"
				// 	}
				// }
				let data4 = await Absen.create({
					EmployeeId: id,
					BranchId: data.id,
					TypeAbsenId: penm[0].id,
					time: getTime,
					date: dateTime,
					amount: penm[0].amount,
					realLocation : `${lokasi.latitude}, ${lokasi.longitude}`,
					typeInput: "mobile",
					absenPic: req.file.filename
				})
				return res.status(200).json({msg: "Berhasil"})
				
			} else {
				return res.status(500).json({msg: "Gagal"})

			}

		} catch(err) {
			console.log(err);
			return res.status(500).json({msg: "Gagal"})
		}
		
	}
	static lastAbsen(req,res) {
		let access_token = cekToken(req.headers.access_token)
		console.log(access_token.id);
		// console.log(access_token);
		Absen.findAll({
			order: [['id','desc']],
			attributes: {exclude: ['createdAt', 'updatedAt','absenPic']},
			where: {
				EmployeeId: access_token.id
			},
			include: [
				{
					model: TypeAbsen,
					attributes: { 
						exclude: ['createdAt', 'updatedAt','amount','timeStart','timeEnd']
					}
				},
				{
					model: Branch,
					attributes: { 
						exclude: ['createdAt', 'updatedAt','longitude', 'latitude','rekNumber' ]
					}
				},
				{
					model: Employee,
					attributes: { 
						exclude: ['createdAt', 'updatedAt','password' ]
					}
				},
			]
		})
		.then(data => {
			let hasil = []
			let penm = data.slice(0,4)
			data.map(e => {
				let a = {
					'Nama Karyawan': e.Employee.employeeName,
					Lokasi: e.Branch.branchName,
					typeAbsen: e.TypeAbsen.typeName,
					date: e.date,
					time: e.time
				}
				hasil.push(a)
			})
			res.status(200).json(hasil)
		}).catch(err => {
			console.log(err);
			res.status(404).json(err)
		})
	}

}

module.exports = MobileController;
