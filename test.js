const moment = require('moment')
// let b = new Date()
// let c = ("23:00")
// let a = moment(b).format('HH:MM')
// console.log(a);

// if(c > a) console.log("yes");
// let z = moment(b).format('YYYY:MM:DD')
// console.log(z);

// console.log(CC);

let data = [
    {
        nama: "Budi",
        umur : 30,
        nilai: 78
    },
    {
        nama: "Anton",
        umur : 30,
        nilai: 95
    },
    {
        nama: "Budi",
        umur : 30,
        nilai: 92
    },
    {
        nama: "Andre",
        umur : 30,
        nilai: 82
    },
    {
        nama: "Anton",
        umur : 30,
        nilai: 99
    },
]

// let hasil = data.filter(e => e.nama == "Budi")
// let hasil = []
// data.map(e => {
//     if(e.nama == "Budi") hasil.push(e)
// })
// console.log(hasil);
let penm =  data.filter(e => e.nama == "Andre" && e.umur == 30)
console.log(penm);
// let penm = []
// data.forEach(e => {
//     let y = 0
//         penm.forEach(x => {
//             if(e.nama == x.nama) {
//                 y++ 
//                 x.nilai += e.nilai    
//             }
//         })
//         if(y == 0) {
//             penm.push(e)
//         }
// })

// console.log(penm);
// let hasil =  [
//     {
//         nama: "Budi",
//         umur : 30,
//         nilai: 170
//     },
//     {
//         nama: "Anton",
//         umur : 30,
//         nilai: 194
//     },
//     {
//         nama: "Andre",
//         umur : 30,
//         nilai: 82
//     },
// ]

// if(penm = hasil) console.log('====================================');
// console.log();
// console.log('====================================');

let aa = moment(new Date).format("YYYY-MM-DD") 
let bb = new Date()

console.log(aa);
console.log(bb);
bb.setDate(bb.getDate())
bb= moment(bb).format("YYYY-MM-DD") 
// console.log(moment(bb).format("YYYY-MM-DD"))
if(bb <= aa) console.log("yess");
console.log(moment(bb).format("YYYY-MM-DD") );


static addAbsen(req,res) {
    console.log("asuuuk mobil");
    let flag = false
    try {
    let barcode = JSON.parse(req.body.barcode)
    let lokasi = JSON.parse(req.body.lokasi)
    let id = +JSON.parse(req.body.id)
    console.log(barcode);
    // const { access_token } = req.headers;
    let access_token = cekToken(req.headers.access_token)
    console.log(access_token);

    // console.log(id, "-----");
    // untuk user id 
    // let user = JSON.parse(req.body.user)
    let thisTime = new Date()
    let getTime = moment(thisTime).format('HH:mm')
    let dateTime = moment(thisTime).format('YYYY-MM-DD')
    
    Branch.findOne({
        where: {
            id: barcode.id
        }
    }).then(data => {
        console.log(+lokasi.latitude, lokasi.longitude, data.latitude, data.longitude);
        // console.log("33");
        
        // console.log(lokasi.latitude, +data.latitude);
        if(!data) {
            console.log("44");
            return res.status(401).json({msg : "Waktu Absen Anda Tidak Ditemukan"})
        } else if(data && ((+lokasi.latitude + 0.003) >= +data.latitude && (+lokasi.latitude - 0.003) <= +data.latitude && 
            (+lokasi.longitude + 0.0003) >= +data.longitude && (+lokasi.longitude - 0.0003) <= +data.longitude)) {
                console.log("12");
            TypeAbsen.findAll({
                where: {
                    BranchId: data.id
                }
            }).then(data2 => {
                console.log("99");
                let penm = data2.filter(e => (e.timeStart <= getTime && e.timeEnd >= getTime))
                Absen.findAll({
                    where: {
                        EmployeeId: id,
                        date: dateTime
                    }
                }).then(data99 => {
                    console.log(data99,"100");
                    data99?.map(e => {
                        if(e.time >= penm[0].timeStart && e.time <= penm[0].timeEnd) {
                            console.log('100000');
                            res.status(401).json({msg: "Anda Sudah Absen"})
                        }
                    })
                })


                if(penm.length < 1) {
                
                    return res.status(401).json({msg : "Waktu Absen Anda Tidak Ditemukan"})
                } else if(penm.length >= 1) {
                    console.log("yes5");
                    Absen.findAll({
                        where: {
                            BranchId: data.id,
                            TypeAbsenId: penm[0].id,
                            EmployeeId: id
                        }
                    }).then(data3 => {
                        console.log("yes2");
                        let penm2 = data3.filter(e => (e.date == dateTime))
                        // console.log(penm2, "penm2");
                        if(penm2.length >= 1) {
                            return res.status(401).json({msg : "Waktu Absen Anda Tidak Ditemukan"})
                        } else {
                            console.log(data.id,penm[0].amount,lokasi.latitude,lokasi.longitude,req.file.filename,  "--");
                            Absen.create({
                                EmployeeId: id,
                                BranchId: data.id,
                                TypeAbsenId: penm[0].id,
                                time: getTime,
                                date: dateTime,
                                amount: penm[0].amount,
                                realLocation : `${lokasi.latitude}, ${lokasi.longitude}`,
                                typeInput: "mobile",
                                absenPic: req.file.filename
                            }).then(data4 => {
                                console.log("berhasil");
                                res.status(201).json({msg : "Berhasil"})
                            }).catch(err => {
                                console.log(err);
                                res.status(401).json(err)
                            })
                        }
                    }).catch(err => {
                        res.status(401).json(err)
                    })
                }
            }).catch(err => {
                console.log(err);
                res.status(401).json(err)
            })
        } else {
            return res.status(401).json({msg : "Periksa Kembali data anda"})
        }
    }).catch(err => {
        console.log(err);
        res.status(401).json(err)
    })

    }catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
    //  belum ada validasi untuk absen per orang, jadi cek dlu apakah khusus orang tersebut sudah absen atau belum
    // console.log(JSON.parse(req.body.lokasi));
    // let body = JSON.parse(req.body)
    
    
}