const webRouter = require('express').Router();
const WebController = require('../controllers/webController');
const AdminAutenticate = require('../middleware/AdminAutenticate');
// user
webRouter.get('/user',  WebController.getAllUser);
webRouter.post('/login', WebController.login);
webRouter.post('/user', WebController.addUser);
webRouter.delete('/user/:id', WebController.deleteUser);
webRouter.patch('/password',AdminAutenticate, WebController.changePassword);

// Employee
webRouter.get('/employee', WebController.getTableEmployee);
webRouter.get('/allemployee', WebController.getEmployees);
webRouter.post('/employee', WebController.addEmployee);
webRouter.delete('/employee/:id', WebController.deleteEmployeee);

// absen
webRouter.get('/absenrecap', WebController.getBranchAbsen);
webRouter.get('/absenuser', WebController.getUserAbsen);
webRouter.post('/absenmanual', WebController.addManualAbsen);
webRouter.delete("/branch/:id", WebController.deleteBranch)
webRouter.patch('/status/:id', WebController.changeStatusAbsen)

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



module.exports = webRouter;
