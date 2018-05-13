const Field = require('../models').field;
const form = require('../models').form;
const LogController = require('./LogController');
// const field;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, field;
    let field_info = req.body;

    [err, field] = await to(Field.bulkCreate(field_info));
    if(err) return ReE(res, err, 422);
    LogController.create({username:req.user.username, nip:req.user.NIP, message:"create field", detail:""});
    return ReS(res, {data:field}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    Field.findAll({
        include: [{
            model:form,
            attributes:['id', 'nama', 'id_dataset']
        }]
    }).then(fields => {    
        LogController.create({username:req.user.username, nip:req.user.NIP, message:"get all field", detail:""});
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
            attributes:['id', 'nama', 'id_dataset']
        }]
    }).then(fields => {    
        LogController.create({username:req.user.username, nip:req.user.NIP, message:"get all field by form", detail:""});
        return ReS(res, {data:fields}, 201);
    });
}
module.exports.getAllByForm = getAllByForm;

const getAllByFormNonAuth = async function(req, res){
    let form = req.params.form;
    Field.findAll({where: {
            id_form:form
        }
    }).then(fields => ReS(res, {data:fields}, 201));
}
module.exports.getAllByFormNonAuth = getAllByFormNonAuth;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    Field.findById(id,{
        include: [{
            model:form,
            attributes:['id', 'nama', 'id_dataset']
        }]
    }).then(field => {    
        LogController.create({username:req.user.username, nip:req.user.NIP, message:"get field", detail:"id : "+id});
        return ReS(res, {data:field}, 201);
    });
}
module.exports.get = get;

const getNonAuth = function(req, res){
    let id = req.params.id;
    Field.findById(id,{
        include: [{
            model:form,
            attributes:['id', 'nama', 'id_dataset']
        }]
    }).then(field => ReS(res, {data:field}, 201));
}
module.exports.getNonAuth = getNonAuth;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    let field_info = req.body;
    Field.update(field_info, { where: { id: id }
    }).then(field => {    
        Field.findById(id,{
            include: [{
                model:form,
                attributes:['id', 'nama', 'id_dataset']
            }]
        }).then(field => {    
            LogController.create({username:req.user.username, nip:req.user.NIP, message:"update field", detail:"id : "+id});
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
        LogController.create({username:req.user.username, nip:req.user.NIP, message:"remove field", detail:"id : "+id});
        return ReS(res, {message:'Deleted field'}, 204);
    });
}
module.exports.remove = remove;