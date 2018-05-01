const m_m_peg = require('../models').m_m_peg;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, m_peg_;
    let m_peg_info = req.body;

    [err, m_peg_] = await to(m_peg.create(m_peg_info));
    if(err) return ReE(res, err, 422);
    let m_peg_json = m_peg_.toWeb();
    return ReS(res,{m_peg:m_peg_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    m_peg.findAll().then(m_pegs => {    
        return ReS(res, {m_pegs:m_pegs}, 201);
    });
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    m_peg.findById(id).then(m_peg_ => {    
        return ReS(res, {m_peg:m_peg_}, 201);
    });
}
module.exports.get = get;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    let m_peg_info = req.body;
    m_peg.update(m_peg_info, { where: { id: id }
    }).then(m_peg_ => {    
        return ReS(res, {m_peg:m_peg_}, 201);
    });
}
module.exports.update = update;

const remove = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    m_peg.destroy({
        where: {
          id: id
        },
        truncate: false
    }).then(m_peg_ => {    
        return ReS(res, {message:'Deleted m_pegawai'}, 204);
    });
}
module.exports.remove = remove;