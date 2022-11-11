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

// let aa = moment(new Date).format("YYYY-MM-DD") 
// let bb = new Date()

// console.log(aa);
// console.log(bb);
// bb.setDate(bb.getDate())
// bb= moment(bb).format("YYYY-MM-DD") 
// // console.log(moment(bb).format("YYYY-MM-DD"))
// if(bb <= aa) console.log("yess");
// console.log(moment(bb).format("YYYY-MM-DD") );

let aa = [

    {
        lokasi: 'makassar dalam',
        nama: 'ferdi sambo'
    },
    {
        lokasi: 'makassar luar',
        nama: 'ferdi sambo'
    },
    {
        lokasi: 'Jakarta dalam',
        nama: 'Andi sambo'
    },
    {
        lokasi: 'makassar dalam',
        nama: 'Putri C'
    },
    {
        lokasi: 'Berlin',
        nama: 'Ricky'
    },

]

let hasil  = aa.filter(e =>{
    let text= (e.lokasi + " " + e.nama).toLocaleLowerCase()
    return text.includes('alam')
})

let cc = ['admin', 'staff', 'boss']

if(cc.includes('admin')) console.log("yesss");
console.log(hasil);




    
