const webRouter = require('express').Router();
const WebController = require('../controllers/webController');
const AdminAutenticate = require('../middleware/AdminAutenticate');
// user
webRouter.get('/user',  WebController.getAllUser);
webRouter.post('/login', WebController.login);
webRouter.post('/user',AdminAutenticate, WebController.addUser);
webRouter.delete('/user/:id',AdminAutenticate, WebController.deleteUser);
webRouter.patch('/password',AdminAutenticate, WebController.changePassword);
webRouter.patch('/resetpass/:id',AdminAutenticate, WebController.resetPassEmployee);

// Employee
webRouter.get('/employee',AdminAutenticate, WebController.getTableEmployee);
webRouter.get('/allemployee',AdminAutenticate, WebController.getEmployees);
webRouter.post('/employee',AdminAutenticate, WebController.addEmployee);
webRouter.delete('/employee/:id',AdminAutenticate, WebController.deleteEmployeee);
webRouter.put('/employee/:id',AdminAutenticate, WebController.editEmployee);

// absen
webRouter.get('/absenrecap',AdminAutenticate, WebController.getBranchAbsen);
webRouter.get('/allabsen',AdminAutenticate, WebController.getAllAbsen);
webRouter.get('/absenuser',AdminAutenticate, WebController.getUserAbsen);
webRouter.post('/absenmanual',AdminAutenticate, WebController.addManualAbsen);
webRouter.delete("/branch/:id",AdminAutenticate, WebController.deleteBranch)
webRouter.patch('/status/:id',AdminAutenticate, WebController.changeStatusAbsen)

// webRouter.get("/")

// Branch
webRouter.post('/branch', WebController.addBranch);
webRouter.get('/branch', WebController.getBranch);
webRouter.get('/branch/:id', WebController.getOneBranch);
webRouter.put('/branch/:id', WebController.editBranch);

// TypeAbsen
webRouter.get("/typeabsen", WebController.getTypeAbsen)
webRouter.get("/tabletypeabsen", WebController.getTableTypeAbsen)
webRouter.post("/typeabsen", WebController.addTypeAbsen)
webRouter.put("/typeabsen/:id", WebController.editTypeAbsen)
webRouter.delete("/typeabsen/:id", WebController.deleteTypeAbsen)


webRouter.get("/photo", WebController.deletePhoto)


// print
webRouter.get("/print/branch", WebController.branchAbsenPrint)
webRouter.get("/print/personal", WebController.employeeAbsenPrint)


module.exports = webRouter;
