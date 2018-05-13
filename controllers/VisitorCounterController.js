const VisitorCounter = require('../models').visitor_counter;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id_dataset = req.params.iddataset;
    VisitorCounter.findOne().then(data => {
        if(data){
            let counter = {
                counter:(data.counter)+1
            }
            VisitorCounter.findById(data.id)
            .then( datacounter => 
                datacounter.set(counter)
            )
            .then ( datacounter_ => datacounter_.save())
            .then ( result => ReS( res, {message :'Counter Updated'}, 201 ) )
        }
        else{
            let counter = {
                counter:1
            }
            VisitorCounter.create(counter).then(result => {                
                let counter_json = result.toWeb();
                return ReS(res,{data:counter_json}, 201);
            })
        }
    })
}
module.exports.create = create;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    VisitorCounter.findOne()
    .then(results => {
        return ReS(res, {data:results}, 201);
    } ) 
}
module.exports.get = get;