const DataSet = require('../models').dataset;
const LogController = require('./LogController');
const UserController = require('./UserController');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, dataset;
    let dataset_info = req.body;
    UserController.checkuser(req.user.id, dataset_info.id_opd).then(user => {
        console.log(user);
        if(user == true) {            
            DataSet.create(dataset_info).then(result => {
                let dataset_json = result.toWeb();
                LogController.create({username:req.user.username, nip:req.user.NIP, message:"create dataset", detail:"id : "+dataset_json.id});
                return ReS(res,{data:dataset_json}, 201);
            })
        }
        else{
            return ReE(res, "don't have permission", 422);
        }
    })
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    UserController.getOpdUser(req.user.id).then(opd => {
        if( req.user.id_hakakses == 3 ) {            
            DataSet.findAll({where: {
                id_opd:opd
            }}).then(datasets => {    
                LogController.create({username:req.user.username, nip:req.user.NIP, message:"get all dataset", detail:""});
                return ReS(res, {data:datasets}, 201);
            });
        }
        else {            
            DataSet.findAll().then(datasets => {    
                LogController.create({username:req.user.username, nip:req.user.NIP, message:"get all dataset", detail:""});
                return ReS(res, {data:datasets}, 201);
            });
        }
    })
}
module.exports.getAll = getAll;

const getAllNonAuth = async function(req, res){
    DataSet.findAll().then(datasets => ReS(res, {data:datasets}, 201));
}
module.exports.getAllNonAuth = getAllNonAuth;

const searchNonAuth = async function(req, res){
    let key = req.body.search;
    
    console.log(key);
    DataSet.findAll({where:{
        nama: {
            [Op.like]: '%'+key+'%'
          }
        }
    } ).then(datasets => ReS(res, {data:datasets}, 201));
}
module.exports.searchNonAuth = searchNonAuth;

const getAllHomePage = async function(req, res){
    DataSet.findAll({ limit: 12, order: [['createdAt', 'DESC']] }).then(datasets => ReS(res, {data:datasets}, 201));
}
module.exports.getAllHomePage = getAllHomePage;

const getAllByOpdNonAuth = async function(req, res){
    let opd = req.params.opd;
    DataSet.findAll({
        where: {
            id_opd:opd
        }
    }).then(datasets => ReS(res, {data:datasets}, 201));
}
module.exports.getAllByOpdNonAuth = getAllByOpdNonAuth;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    DataSet.findById(id).then(dataset => {    
        LogController.create({username:req.user.username, nip:req.user.NIP, message:"get dataset", detail:"id : "+id});
        return ReS(res, {data:dataset}, 201);
    });
}
module.exports.get = get;

const getNonAuth = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    DataSet.findById(id).then(dataset => ReS(res, {data:dataset}, 201));
}
module.exports.getNonAuth = getNonAuth;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    let dataset_info = req.body;
    DataSet.update(dataset_info, { where: { id: id }
    }).then(dataset => {    
        DataSet.findById(id).then(dataset => {    
            LogController.create({username:req.user.username, nip:req.user.NIP, message:"update dataset", detail:"id : "+id});
            return ReS(res, {data:dataset}, 201);
        });
    });
}
module.exports.update = update;

const remove = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    DataSet.destroy({
        where: {
          id: id
        },
        truncate: false
    }).then(dataset => {    
        LogController.create({username:req.user.username, nip:req.user.NIP, message:"remove dataset", detail:"id : "+id});
        return ReS(res, {message:'Deleted dataset'}, 204);
    });
}
module.exports.remove = remove;

const checkdataset = function(iduser, iddataset){
    return new Promise( (solve, reject) => {
        DataSet.findById(iddataset).then(dataset => {
            console.log(iduser, dataset.id_opd, iddataset);   
            UserController.checkuser(iduser, dataset.id_opd).then(user => {
                if (user == true) {
                    solve(true);
                }
                else {
                    solve(false);
                }
            })
        });        
    })
}
module.exports.checkdataset = checkdataset;