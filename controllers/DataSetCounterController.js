const DataSetCounter = require('../models').dataset_counter;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id_dataset = req.params.iddataset;
    DataSetCounter.findOne({ where: {id_dataset: id_dataset} }).then(data => {
        if(data){
            let counter = {
                counter:(data.counter)+1
            }
            DataSetCounter.findById(data.id)
            .then( datacounter => 
                datacounter.set(counter)
            )
            .then ( datacounter_ => datacounter_.save())
            .then ( result => ReS( res, {message :'Counter Updated'}, 201 ) )
        }
        else{
            let counter = {
                counter:1,
                id_dataset:id_dataset
            }
            DataSetCounter.create(counter).then(result => {                
                let counter_json = result.toWeb();
                return ReS(res,{data:counter_json}, 201);
            })
        }
    })
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    DataSetCounter.findAll()
    .then(results => {
        return ReS(res, {data:results}, 201);
    } ) 
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    DataSetCounter.findById(id).then( result => ReS(res, {data: result}, 201) );
}
module.exports.get = get;

const getByIdDataset = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id_dataset = req.params.iddataset;
    DataSetCounter.findOne({ where: {id_dataset: id_dataset} }).then( result => ReS(res, {data: result}, 201) );
}
module.exports.getByIdDataset = getByIdDataset;