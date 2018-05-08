const express 			= require('express');
const router 			= express.Router();

const UserController 	= require('./../controllers/UserController');
const DataSetController = require('./../controllers/DataSetController');
const FormController = require('./../controllers/FormController');
const FieldController = require('./../controllers/FieldController');
const HakaksesController = require('./../controllers/HakaksesController');
const OpdController = require('./../controllers/OpdController');
const PegController = require('./../controllers/PegController');
const LogController = require('./../controllers/LogController');
const passport = require('passport');
const path = require('path');

require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

/* User */
router.post('/register', UserController.create);                                             
router.get('/me', passport.authenticate('jwt', {session:false}), UserController.getOwn);  
router.get('/user/:id', passport.authenticate('jwt', {session:false}), UserController.get);     
router.get('/users', passport.authenticate('jwt', {session:false}), UserController.getAll);   
router.put('/users', passport.authenticate('jwt', {session:false}), UserController.updateOwn); 
router.put('/user/:id', passport.authenticate('jwt', {session:false}), UserController.update);    
router.delete('/user/:id', passport.authenticate('jwt', {session:false}), UserController.remove);  
router.post('/users/login', UserController.login);

/*Data set*/
router.post('/dataset', passport.authenticate('jwt', {session:false}), DataSetController.create);
router.get('/dataset', passport.authenticate('jwt', {session:false}), DataSetController.getAll);
router.get('/dataset/:id', passport.authenticate('jwt', {session:false}), DataSetController.get);
router.delete('/dataset/:id', passport.authenticate('jwt', {session:false}), DataSetController.remove);
router.put('/dataset/:id', passport.authenticate('jwt', {session:false}), DataSetController.update);

/* Form */
router.post('/form', passport.authenticate('jwt', {session:false}), FormController.create);
router.get('/form', passport.authenticate('jwt', {session:false}), FormController.getAll);
router.get('/form/:id', passport.authenticate('jwt', {session:false}), FormController.get);
router.delete('/form/:id', passport.authenticate('jwt', {session:false}), FormController.remove);
router.put('/form/:id', passport.authenticate('jwt', {session:false}), FormController.update);

/* Field */
router.post('/field', passport.authenticate('jwt', {session:false}), FieldController.create);
router.get('/field', passport.authenticate('jwt', {session:false}), FieldController.getAll);
router.get('/field/form/:idform', passport.authenticate('jwt', {session:false}), FieldController.getAllByForm);
router.get('/field/:id', passport.authenticate('jwt', {session:false}), FieldController.get);
router.delete('/field/:id', passport.authenticate('jwt', {session:false}), FieldController.remove);
router.put('/field/:id', passport.authenticate('jwt', {session:false}), FieldController.update);

/* Peg */
router.get('/peg', PegController.getAll);
router.get('/peg/:id', PegController.get);

/* Opd */
router.get('/opd', OpdController.getAll);
router.get('/opd/:id', OpdController.get);

/* Hakakses */
router.post('/hakakses', passport.authenticate('jwt', {session:false}), HakaksesController.create);
router.get('/hakakses', passport.authenticate('jwt', {session:false}), HakaksesController.getAll);
router.get('/hakakses/:id', passport.authenticate('jwt', {session:false}), HakaksesController.get);
router.delete('/hakakses/:id', passport.authenticate('jwt', {session:false}), HakaksesController.remove);
router.put('/hakakses/:id', passport.authenticate('jwt', {session:false}), HakaksesController.update);

/* Log */
router.get('/log', LogController.get);

module.exports = router;