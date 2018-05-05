const DataSet = require('../models').dataset;
// const dataset;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, dataset;
    let dataset_info = req.body;
    [err, dataset] = await to(DataSet.create(dataset_info));
    if(err) return ReE(res, err, 422);
    console.log(dataset);
    let dataset_json = dataset.toWeb();
    return ReS(res,{dataset:dataset_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    DataSet.findAll().then(datasets => {    
        return ReS(res, {datasets:datasets}, 201);
    });
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    DataSet.findById(id).then(dataset => {    
        return ReS(res, {dataset:dataset}, 201);
    });
}
module.exports.get = get;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    let dataset_info = req.body;
    DataSet.update(dataset_info, { where: { id: id }
    }).then(dataset => {    
        return ReS(res, {dataset:dataset}, 201);
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
        return ReS(res, {message:'Deleted dataset'}, 204);
    });
}
module.exports.remove = remove;