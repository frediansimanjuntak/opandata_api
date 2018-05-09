const DataSet = require('../models').dataset;
const LogController = require('./LogController');
const UserController = require('./UserController');

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, dataset;
    let dataset_info = req.body;
    UserController.checkuser(req.user.id, dataset_info.id_opd).then(user => {
        console.log(user);
        if(user == true) {            
            DataSet.create(dataset_info).then(result => {
                LogController.create({username:req.user.username, nip:req.user.NIP, message:"create dataset"});
                let dataset_json = result.toWeb();
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
    DataSet.findAll().then(datasets => {    
        LogController.create({username:req.user.username, nip:req.user.NIP, message:"get all dataset"});
        return ReS(res, {data:datasets}, 201);
    });
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    DataSet.findById(id).then(dataset => {    
        LogController.create({username:req.user.username, nip:req.user.NIP, message:"get dataset"});
        return ReS(res, {data:dataset}, 201);
    });
}
module.exports.get = get;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    let dataset_info = req.body;
    DataSet.update(dataset_info, { where: { id: id }
    }).then(dataset => {    
        DataSet.findById(id).then(dataset => {    
            LogController.create({username:req.user.username, nip:req.user.NIP, message:"update dataset"});
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
        LogController.create({username:req.user.username, nip:req.user.NIP, message:"remove dataset"});
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