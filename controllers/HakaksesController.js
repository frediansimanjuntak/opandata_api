const m_hakakses = require('../models').m_hakakses;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, m_hakakses_;
    let m_hakakses_info = req.body;

    [err, m_hakakses_] = await to(m_hakakses.create(m_hakakses_info));
    if(err) return ReE(res, err, 422);
    let m_hakakses_json = m_hakakses_.toWeb();
    return ReS(res,{data:m_hakakses_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    console.log(m_hakakses);
    m_hakakses.findAll().then(m_hakaksess => {    
        return ReS(res, {data:m_hakaksess}, 201);
    });
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    m_hakakses.findById(id).then(m_hakakses_ => {    
        return ReS(res, {data:m_hakakses_}, 201);
    });
}
module.exports.get = get;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    let m_hakakses_info = req.body;
    m_hakakses.update(m_hakakses_info, { where: { id: id }
    }).then(m_hakakses_ => {    
        m_hakakses.findById(id).then(m_hakakses_ => {    
            return ReS(res, {data:m_hakakses_}, 201);
        });
    });
}
module.exports.update = update;

const remove = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    m_hakakses.destroy({
        where: {
          id: id
        },
        truncate: false
    }).then(m_hakakses_ => {    
        return ReS(res, {message:'Deleted m_hakakses'}, 204);
    });
}
module.exports.remove = remove;