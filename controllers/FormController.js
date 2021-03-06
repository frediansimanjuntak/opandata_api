const Form = require('../models').form;
const dataset = require('../models').dataset;
const LogController = require('./LogController');
const DataSetController = require('./DataSetController');
const UserController = require('./UserController');
// const form;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, form;
    let form_info = req.body;
    DataSetController.checkdataset(req.user.id, form_info.id_dataset).then(dataset => {
        if(dataset == true) {
            Form.create(form_info).then(result => { 
                let form_json = result.toWeb();               
                LogController.create({username:req.user.username, nip:req.user.NIP, message:"create form", detail:"id : "+form_json.id});
                return ReS(res,{data:form_json}, 201);
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
    UserController.getOpdUser(req.user.id).then(idopd => {
        if( req.user.id_hakakses == 3 ) { 
            Form.findAll({
                include: [{
                    model:dataset,
                    attributes:['id', 'nama', 'id_opd'],                    
                    where: {id_opd:idopd}
                }]
            })
            .then(forms => {    
                LogController.create({username:req.user.username, nip:req.user.NIP, message:"get all form", detail:""});
                return ReS(res, {data:forms}, 201);
            });
        }
        else {
            Form.findAll({
                include: [{
                    model:dataset,
                    attributes:['id', 'nama', 'id_opd']
                }]
            })
            .then(forms => {    
                LogController.create({username:req.user.username, nip:req.user.NIP, message:"get all form", detail:""});
                return ReS(res, {data:forms}, 201);
            });
        } 
    } )
}
module.exports.getAll = getAll;

const getAllByDatasetNonAuth = async function(req, res){ 
    let dataset = req.params.dataset;
    Form.findAll({
        where: {
            id_dataset:dataset
        }
    })
    .then(forms => ReS(res, {data:forms}, 201));
}
module.exports.getAllByDatasetNonAuth = getAllByDatasetNonAuth;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    Form.findById(id, {
        include: [{
            model:dataset,
            attributes:['id', 'nama']
        }]
    }).then(form => {    
        LogController.create({username:req.user.username, nip:req.user.NIP, message:"get form", detail:"id : "+id});
        return ReS(res, {data:form}, 201);
    });
}
module.exports.get = get;

const getNonAuth = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    Form.findById(id, {
        include: [{
            model:dataset,
            attributes:['id', 'nama']
        }]
    }).then(form => ReS(res, {data:form}, 201));
}
module.exports.getNonAuth = getNonAuth;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    let form_info = req.body;
    Form.update(form_info, { where: { id: id }
    }).then(form => {    
        Form.findById(id, {
            include: [{
                model:dataset,
                attributes:['id', 'nama']
            }]
        }).then(form => {    
            LogController.create({username:req.user.username, nip:req.user.NIP, message:"update form", detail:"id : "+id});
            return ReS(res, {data:form}, 201);
        });
    });
}
module.exports.update = update;

const remove = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    Form.destroy({
        where: {
          id: id
        },
        truncate: false
    }).then(form => {    
        LogController.create({username:req.user.username, nip:req.user.NIP, message:"remove form", detail:"id : "+id});
        return ReS(res, {message:'Deleted form'}, 204);
    });
}
module.exports.remove = remove;