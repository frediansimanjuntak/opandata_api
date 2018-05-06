const m_opd = require('../models').m_opd;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, m_opd_;
    let m_opd_info = req.body;

    [err, m_opd_] = await to(m_opd.create(m_opd_info));
    if(err) return ReE(res, err, 422);
    let m_opd_json = m_opd_.toWeb();
    return ReS(res,{data:m_opd_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    m_opd.findAll().then(m_opds => {    
        return ReS(res, {data:m_opds}, 201);
    });
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    m_opd.findById(id).then(m_opd_ => {    
        return ReS(res, {data:m_opd_}, 201);
    });
}
module.exports.get = get;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    let m_opd_info = req.body;
    m_opd.update(m_opd_info, { where: { id: id }
    }).then(m_opd_ => {    
        m_opd.findById(id).then(m_opd_ => {    
            return ReS(res, {data:m_opd_}, 201);
        });
    });
}
module.exports.update = update;

const remove = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    m_opd.destroy({
        where: {
          id: id
        },
        truncate: false
    }).then(m_opd_ => {    
        return ReS(res, {message:'Deleted m_opd'}, 204);
    });
}
module.exports.remove = remove;