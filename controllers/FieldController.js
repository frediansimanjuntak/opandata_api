const Field = require('../models').field;
const form = require('../models').form;
const fs = require('fs')
  , Log = require('log')
  , log = new Log('debug', fs.createWriteStream('useractivity.log'));
// const field;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, field;
    let field_info = req.body;

    [err, field] = await to(Field.bulkCreate(field_info));
    if(err) return ReE(res, err, 422);
    Field.findAll({
        include: [{
            model:form,
            attributes:['id', 'nama', 'id_opd', 'id_dataset']
        }]
    }).then(fields => {    
        log.info('user '+req.user.username+' create field');
        return ReS(res, {data:fields}, 201);
    });
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    Field.findAll({
        include: [{
            model:form,
            attributes:['id', 'nama', 'id_opd', 'id_dataset']
        }]
    }).then(fields => {    
        log.info('user '+req.user.username+' get all data field');
        return ReS(res, {data:fields}, 201);
    });
}
module.exports.getAll = getAll;

const getAllByForm = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let idform = req.params.idform;
    Field.findAll({where: {
            id_form:idform
        },
        include: [{
            model:form,
            attributes:['id', 'nama', 'id_opd', 'id_dataset']
        }]
    }).then(fields => {    
        log.info('user '+req.user.username+' get all data field');
        return ReS(res, {data:fields}, 201);
    });
}
module.exports.getAllByForm = getAllByForm;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    Field.findById(id,{
        include: [{
            model:form,
            attributes:['id', 'nama', 'id_opd', 'id_dataset']
        }]
    }).then(field => {    
        log.info('user '+req.user.username+' get data from field with id field'+ id);
        return ReS(res, {data:field}, 201);
    });
}
module.exports.get = get;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    let field_info = req.body;
    Field.update(field_info, { where: { id: id }
    }).then(field => {    
        Field.findById(id,{
            include: [{
                model:form,
                attributes:['id', 'nama', 'id_opd', 'id_dataset']
            }]
        }).then(field => {    
            log.info('user '+req.user.username+' update field with id field'+ id);
            return ReS(res, {data:field}, 201);
        });
    });
}
module.exports.update = update;

const remove = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    Field.destroy({
        where: {
          id: id
        },
        truncate: false
    }).then(field => {    
        log.info('user '+req.user.username+' remove field with id field'+ id);
        return ReS(res, {message:'Deleted field'}, 204);
    });
}
module.exports.remove = remove;