const computerRouter = require('express').Router();
const computerController = require('../controllers/computerController');

computerRouter.get('/displayComputer', computerController.displayComputer);
computerRouter.post('/addComputer', computerController.addComputer);
computerRouter.post('/updateComputer/:id', computerController.updateComputer);
computerRouter.get('/deleteComputer/:id', computerController.deleteComputer);

module.exports = computerRouter