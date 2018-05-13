const Logo_opd = require('../models').logo_opd;
const LogController = require('./LogController');

const create = async function(req, res){
    let err, logo;
    data = {
        id_opd:req.body.id_opd,
        photo:req.file.filename
    }
    console.log(data);
    [err, logo] = await to(Logo_opd.create(data));
    if(err) return ReE(res, err, 422);
    return ReS(res, {data:logo.toWeb()});
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    Logo_opd.findAll().then(logos => {    
        return ReS(res, {data:logos}, 201);
    });
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    Logo_opd.findById(id).then(logo => ReS(res, {data:logo.toWeb()}) );
}
module.exports.get = get;

const update = async function(req, res){
    data = {
        id_opd:req.body.id_opd,
        photo:req.file.filename
    }
    console.log(data);
    let id = req.params.id;
    Logo_opd.update(data, { where: { id: id }
    }).then(logo => {    
        Logo_opd.findById(id).then(logo => {    
            LogController.create({username:req.user.username, nip:req.user.NIP, message:"update logo", detail:"id : "+id});
            return ReS(res, {data:logo}, 201);
        });
    });
}
module.exports.update = update;

const remove = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    Logo_opd.destroy({
        where: {
          id: id
        },
        truncate: false
    }).then(logo => {    
        LogController.create({username:req.user.username, nip:req.user.NIP, message:"remove logo", detail:"id : "+id});
        return ReS(res, {message:'Deleted logo'}, 204);
    });
}
module.exports.remove = remove;