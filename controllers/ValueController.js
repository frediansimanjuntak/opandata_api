// const value = require('../models').value;
const value;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, value;
    let value_info = req.body;

    [err, value] = await to(value.create(value_info));
    if(err) return ReE(res, err, 422);
    let value_json = value.toWeb();
    return ReS(res,{value:value_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, values;

    [err, values] = await to(user.getvalues({include: [ {association: value.Users} ] }));

    let values_json =[]
    for( let i in values){
        let value = values[i];
        let users =  value.Users;
        let value_info = value.toWeb();
        let users_info = [];
        for (let i in users){
            let user = users[i];
            // let user_info = user.toJSON();
            users_info.push({user:user.id});
        }
        value_info.users = users_info;
        values_json.push(value_info);
    }

    console.log('c t', values_json);
    return ReS(res, {values:values_json});
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let value = req.value;

    return ReS(res, {value:value.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, value, data;
    value = req.value;
    data = req.body;
    value.set(data);

    [err, value] = await to(value.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {value:value.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let value, err;
    value = req.value;

    [err, value] = await to(value.destroy());
    if(err) return ReE(res, 'error occured trying to delete the value');

    return ReS(res, {message:'Deleted value'}, 204);
}
module.exports.remove = remove;