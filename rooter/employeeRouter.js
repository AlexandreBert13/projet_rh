const employeeRouter = require('express').Router();
const employeeController = require('../controllers/employeeController');

employeeRouter.get('/addEmployee', employeeController.displayAddEmployee);
employeeRouter.post('/addEmployee', employeeController.addEmployee);
employeeRouter.get("/deleteEmployee/:id", employeeController.deleteEmployee);
employeeRouter.post("/updateEmployee/:id" , employeeController.updateEmployee);

module.exports = employeeRouter