const mobileRouter = require('express').Router();
const MobileController = require('../controllers/mobileController');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const path = require("path");
const diskStorage = multer.diskStorage({
  
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
      // console.log(req.body,"+++++++++++++++");
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        // file.fieldname + new Date()
        );
        // console.log(file.fieldname,"-", new Date(), "////")
    },
  });
// user


mobileRouter.get('/', MobileController.getEmployee)
mobileRouter.get('/lastabsen', MobileController.lastAbsen)
mobileRouter.post('/login', MobileController.login);
mobileRouter.post('/absen',multer({ storage: diskStorage }).single("photo"), MobileController.addAbsen);
// mobileRouter.post('/absen', MobileController.addAbsen);
mobileRouter.get('/absen1', MobileController.tesRout);
// Employee

module.exports = mobileRouter;
