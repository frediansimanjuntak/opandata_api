const Value = require('../models').value;
const form = require('../models').form;
const field = require('../models').field;
const LogController = require('./LogController');
// const value;

const create = async function(req, res){
    return new Promise( (solve, reject) => {
        res.setHeader('Content-Type', 'application/json');
        let err, value;
        let value_info = req.body;
    
        Value.findAll({
            limit: 1,
            where: {},
            order: [ [ 'createdAt', 'DESC' ]]
        }).then(function(data){
            let group = data.length != 0 ? data[0].group : 0;
            value_info.forEach(function(obj) { obj.group = group+1; });
            Value.bulkCreate(value_info).then(results => {
                LogController.create({username:req.user.username, nip:req.user.NIP, message:"create value"});
                return ReS(res,{value:results}, 201);
            })
        })
    })    
}
module.exports.create = create;

const getAll = async function(req, res){
    return new Promise( (solve, reject) => {
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
    })
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


const getAllByFieldNonAuth = async function(req, res){
    let field = req.params.field;
    Value.findAll({where: {
            id_field:field
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
module.exports.getAllByFieldNonAuth = getAllByFieldNonAuth;

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

const getAllByFormNonAuth = async function(req, res){
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
    }).then(values => ReS(res, {data:values}, 201));
}
module.exports.getAllByFormNonAuth = getAllByFormNonAuth;

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

const getByGroup = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let group = req.params.group;    
    Value.findAll({
        where: {
            group:group
        },
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
module.exports.getByGroup = getByGroup;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    let value_info = req.body;
    Value.update(value_info, { where: { id: id }
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

const updateByGroup = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let group = req.params.group;    
    let value_info = req.body;
    Value.destroy({
        where: {
          group:group
        },
        truncate: false
    }).then(value => {    
        value_info.forEach(function(obj) { obj.group = group; });
        Value.bulkCreate(value_info).then(results => {
            LogController.create({username:req.user.username, nip:req.user.NIP, message:"update value"});
            return ReS(res, {data:results}, 201);
        })
    });
}
module.exports.updateByGroup = updateByGroup;

const removeByGroup = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let group = req.params.group;    
    let value_info = req.body;
    Value.destroy({
        where: {
          group:group
        },
        truncate: false
    }).then(value => {    
        LogController.create({username:req.user.username, nip:req.user.NIP, message:"remove value"});
        return ReS(res, {message:'Deleted value'}, 204);
    });
}
module.exports.removeByGroup = removeByGroup;


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