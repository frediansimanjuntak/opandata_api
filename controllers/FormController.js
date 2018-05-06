const Form = require('../models').form;
const m_opd = require('../models').m_opd;
const dataset = require('../models').dataset;
// const form;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, form;
    let form_info = req.body;

    [err, form] = await to(Form.create(form_info));
    if(err) return ReE(res, err, 422);
    let form_json = form.toWeb();
    return ReS(res,{data:form_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    Form.findAll({
        include: [{
            model:dataset,
            attributes:['id', 'nama']
        }]
    }).then(forms => {    
        return ReS(res, {data:forms}, 201);
    });
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    Form.findById(id, {
        include: [{
            model:dataset,
            attributes:['id', 'nama']
        }]
    }).then(form => {    
        return ReS(res, {data:form}, 201);
    });
}
module.exports.get = get;

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
        return ReS(res, {message:'Deleted form'}, 204);
    });
}
module.exports.remove = remove;