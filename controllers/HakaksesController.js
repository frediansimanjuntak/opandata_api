const hakakses = require('../models').hakakses;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, hakakses_;
    let hakakses_info = req.body;

    [err, hakakses_] = await to(hakakses.create(hakakses_info));
    if(err) return ReE(res, err, 422);
    let hakakses_json = hakakses_.toWeb();
    return ReS(res,{data:hakakses_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    console.log(hakakses);
    hakakses.findAll().then(hakakses_ => {    
        return ReS(res, {data:hakakses_}, 201);
    });
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    hakakses.findById(id).then(hakakses_ => {    
        return ReS(res, {data:hakakses_}, 201);
    });
}
module.exports.get = get;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    let hakakses_info = req.body;
    hakakses.update(hakakses_info, { where: { id: id }
    }).then(hakakses_ => {    
        hakakses.findById(id).then(hakakses_ => {    
            return ReS(res, {data:hakakses_}, 201);
        });
    });
}
module.exports.update = update;

const remove = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    hakakses.destroy({
        where: {
          id: id
        },
        truncate: false
    }).then(hakakses_ => {    
        return ReS(res, {message:'Deleted hakakses'}, 204);
    });
}
module.exports.remove = remove;