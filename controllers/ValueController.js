const Value = require('../models').value;
const form = require('../models').form;
const field = require('../models').field;
const LogController = require('./LogController');
// const value;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, value;
    let value_info = req.body;

    [err, value] = await to(Value.bulkCreate(value_info));
    if(err) return ReE(res, err, 422);
    LogController.create({username:req.user.username, nip:req.user.NIP, message:"create value"});
    return ReS(res,{value:value}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    Value.findAll({
        include: [{
            model:form,
            attributes:['id', 'nama']
        },{
            model:field,
            attributes:['id', 'nama']
        }]
    }).then(values => {    
        LogController.create({username:req.user.username, nip:req.user.NIP, message:"get all value"});
        return ReS(res, {data:values}, 201);
    });
}
module.exports.getAll = getAll;

const getAllByField = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let idfield = req.params.idfield;
    Value.findAll({where: {
            id_field:idfield
        },
        include: [{
            model:form,
            attributes:['id', 'nama']
        },{
            model:field,
            attributes:['id', 'nama']
        }]
    }).then(values => {    
        LogController.create({username:req.user.username, nip:req.user.NIP, message:"get all value by field"});
        return ReS(res, {data:values}, 201);
    });
}
module.exports.getAllByField = getAllByField;

const getAllByForm = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let idform = req.params.idform;
    Value.findAll({where: {
            id_form:idform
        },
        include: [{
            model:form,
            attributes:['id', 'nama']
        },{
            model:field,
            attributes:['id', 'nama']
        }]
    }).then(values => {    
        LogController.create({username:req.user.username, nip:req.user.NIP, message:"get all value by form"});
        return ReS(res, {data:values}, 201);
    });
}
module.exports.getAllByForm = getAllByForm;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    Value.findById(id, {
        include: [{
            model:form,
            attributes:['id', 'nama']
        },{
            model:field,
            attributes:['id', 'nama']
        }]
    }).then(value => {    
        LogController.create({username:req.user.username, nip:req.user.NIP, message:"get value"});
        return ReS(res, {data:value}, 201);
    });
}
module.exports.get = get;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    let form_info = req.body;
    Value.update(form_info, { where: { id: id }
    }).then(value => {    
        Value.findById(id, {
            include: [{
                model:form,
                attributes:['id', 'nama']
            },{
                model:field,
                attributes:['id', 'nama']
            }]
        }).then(value => {    
            LogController.create({username:req.user.username, nip:req.user.NIP, message:"update value"});
            return ReS(res, {data:value}, 201);
        });
    });
}
module.exports.update = update;

const remove = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    Value.destroy({
        where: {
          id: id
        },
        truncate: false
    }).then(value => {    
        LogController.create({username:req.user.username, nip:req.user.NIP, message:"remove value"});
        return ReS(res, {message:'Deleted value'}, 204);
    });
}
module.exports.remove = remove;