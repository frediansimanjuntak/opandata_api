// const field = require('../models').field;
const field;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, field;
    let field_info = req.body;

    [err, field] = await to(field.create(field_info));
    if(err) return ReE(res, err, 422);
    let field_json = field.toWeb();
    return ReS(res,{field:field_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, fields;

    [err, fields] = await to(user.getfields({include: [ {association: field.Users} ] }));

    let fields_json =[]
    for( let i in fields){
        let field = fields[i];
        let users =  field.Users;
        let field_info = field.toWeb();
        let users_info = [];
        for (let i in users){
            let user = users[i];
            // let user_info = user.toJSON();
            users_info.push({user:user.id});
        }
        field_info.users = users_info;
        fields_json.push(field_info);
    }

    console.log('c t', fields_json);
    return ReS(res, {fields:fields_json});
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let field = req.field;

    return ReS(res, {field:field.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, field, data;
    field = req.field;
    data = req.body;
    field.set(data);

    [err, field] = await to(field.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {field:field.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let field, err;
    field = req.field;

    [err, field] = await to(field.destroy());
    if(err) return ReE(res, 'error occured trying to delete the field');

    return ReS(res, {message:'Deleted field'}, 204);
}
module.exports.remove = remove;