// const moment = require('moment')
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
let hasil = []
data.map(e => {
    if(e.nama == "Budi") hasil.push(e)
})
console.log(hasil);


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

// let a = "14:02"
// let b = "14:01"

// if(b <= a) console.log("yes");