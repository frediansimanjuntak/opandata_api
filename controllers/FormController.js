// const form = require('../models').form;
const form;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, form;
    let form_info = req.body;

    [err, form] = await to(form.create(form_info));
    if(err) return ReE(res, err, 422);
    let form_json = form.toWeb();
    return ReS(res,{form:form_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, forms;

    [err, forms] = await to(user.getforms({include: [ {association: form.Users} ] }));

    let forms_json =[]
    for( let i in forms){
        let form = forms[i];
        let users =  form.Users;
        let form_info = form.toWeb();
        let users_info = [];
        for (let i in users){
            let user = users[i];
            // let user_info = user.toJSON();
            users_info.push({user:user.id});
        }
        form_info.users = users_info;
        forms_json.push(form_info);
    }

    console.log('c t', forms_json);
    return ReS(res, {forms:forms_json});
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let form = req.form;

    return ReS(res, {form:form.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, form, data;
    form = req.form;
    data = req.body;
    form.set(data);

    [err, form] = await to(form.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {form:form.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let form, err;
    form = req.form;

    [err, form] = await to(form.destroy());
    if(err) return ReE(res, 'error occured trying to delete the form');

    return ReS(res, {message:'Deleted form'}, 204);
}
module.exports.remove = remove;