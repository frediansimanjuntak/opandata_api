const DataSet = require('../models').dataset;
const fs = require('fs')
  , Log = require('log')
  , log = fs.createWriteStream('useractivity.log');
// const dataset;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, dataset;
    let dataset_info = req.body;
    [err, dataset] = await to(DataSet.create(dataset_info));
    if(err) return ReE(res, err, 422);
    log.info('user '+req.user.username+' create dataset');
    let dataset_json = dataset.toWeb();
    return ReS(res,{data:dataset_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    DataSet.findAll().then(datasets => {    
        log.info('user '+req.user.username+' get all data dataset');
        return ReS(res, {data:datasets}, 201);
    });
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    DataSet.findById(id).then(dataset => {    
        log.info('user '+req.user.username+' get data from dataset with id dataset'+ id);
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
            log.info('user '+req.user.username+' update dataset with id dataset'+ id);
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
        log.info('user '+req.user.username+' remove dataset with id dataset'+ id);
        return ReS(res, {message:'Deleted dataset'}, 204);
    });
}
module.exports.remove = remove;