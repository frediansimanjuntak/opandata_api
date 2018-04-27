const Peg = require('../models').Peg;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, peg;
    let peg_info = req.body;

    [err, peg] = await to(peg.create(peg_info));
    if(err) return ReE(res, err, 422);
    let peg_json = peg.toWeb();
    return ReS(res,{peg:peg_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, pegs;

    [err, pegs] = await to(user.getpegs({include: [ {association: peg.Users} ] }));

    let pegs_json =[]
    for( let i in pegs){
        let peg = pegs[i];
        let users =  peg.Users;
        let peg_info = peg.toWeb();
        let users_info = [];
        for (let i in users){
            let user = users[i];
            // let user_info = user.toJSON();
            users_info.push({user:user.id});
        }
        peg_info.users = users_info;
        pegs_json.push(peg_info);
    }

    console.log('c t', pegs_json);
    return ReS(res, {pegs:pegs_json});
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let peg = req.peg;

    return ReS(res, {peg:peg.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, peg, data;
    peg = req.peg;
    data = req.body;
    peg.set(data);

    [err, peg] = await to(peg.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {peg:peg.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let peg, err;
    peg = req.peg;

    [err, peg] = await to(peg.destroy());
    if(err) return ReE(res, 'error occured trying to delete the peg');

    return ReS(res, {message:'Deleted peg'}, 204);
}
module.exports.remove = remove;