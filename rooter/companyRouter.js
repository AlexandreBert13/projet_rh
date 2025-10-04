const companyRouter = require('express').Router();
const companyController = require('../controllers/companyController');

companyRouter.get('/createCompany', companyController.displayCreateCompany);
companyRouter.post('/createCompany', companyController.createCompany);

companyRouter.get('/login', companyController.displayLogin);
companyRouter.post('/login', companyController.login);

companyRouter.get('/home', companyController.displayHome);
companyRouter.get('/logout', companyController.logout);

module.exports = companyRouter