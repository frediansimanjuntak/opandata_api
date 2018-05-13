const FormCounter = require('../models').form_counter;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id_form = req.params.idform;
    FormCounter.findOne({ where: {id_form: id_form} }).then(data => {
        if(data){
            let counter = {
                counter:(data.counter)+1
            }
            FormCounter.findById(data.id)
            .then( datacounter => 
                datacounter.set(counter)
            )
            .then ( datacounter_ => datacounter_.save())
            .then ( result => ReS( res, {message :'Counter Updated'}, 201 ) )
        }
        else{
            let counter = {
                counter:1,
                id_form:id_form
            }
            FormCounter.create(counter).then(result => {                
                let counter_json = result.toWeb();
                return ReS(res,{data:counter_json}, 201);
            })
        }
    })
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    FormCounter.findAll()
    .then(results => {
        return ReS(res, {data:results}, 201);
    } ) 
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    FormCounter.findById(id).then( result => ReS(res, {data: result}, 201) );
}
module.exports.get = get;

const getByIdForm = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id_form = req.params.idform;
    FormCounter.findOne({ where: {id_form: id_form} }).then( result => ReS(res, {data: result}, 201) );
}
module.exports.getByIdForm = getByIdForm;