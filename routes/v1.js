const express 			= require('express');
const router 			= express.Router();

const UserController 	= require('./../controllers/UserController');
const DataSetController = require('./../controllers/DataSetController');
const FormController = require('./../controllers/FormController');
const FieldController = require('./../controllers/FieldController');
const ValueController = require('./../controllers/ValueController');
const HakaksesController = require('./../controllers/HakaksesController');
const OpdController = require('./../controllers/OpdController');
const PegController = require('./../controllers/PegController');
const LogController = require('./../controllers/LogController');
const LogoOpdController = require('./../controllers/LogoOpdController');
const BeritaController = require('./../controllers/BeritaController');
const InformasiSitusController = require('./../controllers/InformasiSitusController');
const passport = require('passport');
const multer = require('multer');
const crypto = require('crypto');
const mime = require('mime');
const path = require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
    });
  }
});
var upload = multer({ storage: storage });

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
router.get('/dataset/no-auth/:id', DataSetController.getNonAuth);
router.get('/dataset/opd/no-auth/:opd', DataSetController.getAllByOpdNonAuth);
router.get('/datasets/no-auth', DataSetController.getAllNonAuth);
router.get('/datasets/home-page', DataSetController.getAllHomePage);
router.post('/datasets/search', DataSetController.searchNonAuth);

/* Form */
router.post('/form', passport.authenticate('jwt', {session:false}), FormController.create);
router.get('/form', passport.authenticate('jwt', {session:false}), FormController.getAll);
router.get('/form/:id', passport.authenticate('jwt', {session:false}), FormController.get);
router.delete('/form/:id', passport.authenticate('jwt', {session:false}), FormController.remove);
router.put('/form/:id', passport.authenticate('jwt', {session:false}), FormController.update);
router.get('/form/dataset/no-auth/:dataset', FormController.getAllByDatasetNonAuth);
router.get('/form/no-auth/:id', FormController.getNonAuth);

/* Field */
router.post('/field', passport.authenticate('jwt', {session:false}), FieldController.create);
router.get('/field', passport.authenticate('jwt', {session:false}), FieldController.getAll);
router.get('/field/form/:idform', passport.authenticate('jwt', {session:false}), FieldController.getAllByForm);
router.get('/field/:id', passport.authenticate('jwt', {session:false}), FieldController.get);
router.delete('/field/:id', passport.authenticate('jwt', {session:false}), FieldController.remove);
router.put('/field/:id', passport.authenticate('jwt', {session:false}), FieldController.update);
router.get('/field/form/no-auth/:form', FieldController.getAllByFormNonAuth);

/* Value */
router.post('/value', passport.authenticate('jwt', {session:false}), ValueController.create);
router.get('/values', passport.authenticate('jwt', {session:false}), ValueController.getAll);
router.get('/values/form/:idform', passport.authenticate('jwt', {session:false}), ValueController.getAllByForm);
router.get('/values/field/:idfield', passport.authenticate('jwt', {session:false}), ValueController.getAllByField);
router.get('/value/:id', passport.authenticate('jwt', {session:false}), ValueController.get);
router.delete('/value/:id', passport.authenticate('jwt', {session:false}), ValueController.remove);
router.put('/value/:id', passport.authenticate('jwt', {session:false}), ValueController.update);
router.get('/value/get/group/:group', passport.authenticate('jwt', {session:false}), ValueController.getByGroup);
router.post('/value/edit/group/:group', passport.authenticate('jwt', {session:false}), ValueController.updateByGroup);
router.delete('/value/remove/group/:group', passport.authenticate('jwt', {session:false}), ValueController.removeByGroup);
router.get('/values/field/no-auth/:field', ValueController.getAllByFieldNonAuth);
router.get('/values/form/no-auth/:idform', ValueController.getAllByFormNonAuth);

/* Peg */
router.get('/peg', PegController.getAll);
router.get('/peg/:id', PegController.get);

/* Opd */
router.get('/opd/no-auth', OpdController.getAllNonAuth);
router.get('/opd', passport.authenticate('jwt', {session:false}), OpdController.getAll);


/* Berita */
router.get('/berita', BeritaController.getAll);

/* Hakakses */
router.post('/hakakses', passport.authenticate('jwt', {session:false}), HakaksesController.create);
router.get('/hakakses', passport.authenticate('jwt', {session:false}), HakaksesController.getAll);
router.get('/hakakses/:id', passport.authenticate('jwt', {session:false}), HakaksesController.get);
router.delete('/hakakses/:id', passport.authenticate('jwt', {session:false}), HakaksesController.remove);
router.put('/hakakses/:id', passport.authenticate('jwt', {session:false}), HakaksesController.update);

/* Log */
router.get('/log', LogController.get);

/* Informasi Situs */
router.post('/informasi-situs', passport.authenticate('jwt', {session:false}), upload.single('photo'), InformasiSitusController.create);
router.get('/informasi-situs', InformasiSitusController.getAll);
router.get('/informasi-situs/:id', InformasiSitusController.get);
router.delete('/informasi-situs/:id', passport.authenticate('jwt', {session:false}), InformasiSitusController.remove);
router.put('/informasi-situs/:id', passport.authenticate('jwt', {session:false}), upload.single('photo'), InformasiSitusController.update);

/* Logo opd */
router.post('/logo-opd', passport.authenticate('jwt', {session:false}), upload.single('photo'), LogoOpdController.create);
router.get('/logo-opd', LogoOpdController.getAll);
router.get('/logo-opd/:id', LogoOpdController.get);
router.delete('/logo-opd/:id', passport.authenticate('jwt', {session:false}), LogoOpdController.remove);
router.put('/logo-opd/:id', passport.authenticate('jwt', {session:false}), upload.single('photo'), LogoOpdController.update);

module.exports = router;