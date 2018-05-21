var request = require("request");
const DataSet = require('../models').dataset;
const UserController = require('./UserController');

const url = "http://tanjungpinangkota.go.id/api/unitkerjA";

const getAll = async function(req, res){    
    res.setHeader('Content-Type', 'application/json');
    UserController.getOpdUser(req.user.id).then(idopd => {         
        getAllOpd().then((opd => Promise.all( opd.map(opd_ => {
            if( req.user.id_hakakses == 3 ) {                
                if(opd_ && opd_.id_opd == idopd){
                    return opd_;
                }
            }
            else {
                return opd_;
            }
        } ) ) ) )
        .then(results => results.filter((obj) => obj ) )
        .then(opds => {
            return ReS(res, {data:opds}, 201);
        })
    })
}
module.exports.getAll = getAll;

const getAllNonAuth = function(req, res){
    request({
        url: url,
        json: true
    }, function (error, response, body) {    
        if (!error && response.statusCode === 200) {
            let opd = body.opd;
            Promise.all(opd.map(_opd => {
                return DataSet.findOne({ where: {id_opd: _opd.id_opd} }).then(dataset => {
                    if(dataset){
                        console.log(_opd)
                        return _opd;
                    }
                })
            } ) )
            .then(result => {
                return ReS(res, {data:result}, 201);
            })
        }
    })
}
module.exports.getAllNonAuth = getAllNonAuth;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    request({
        url: url+"/"+id,
        json: true
    }, function (error, response, body) {    
        if (!error && response.statusCode === 200) {
            return ReS(res, {data:body.opd}, 201);
        }
    })
}
module.exports.get = get;


const getAllOpd = async function(){    
    return new Promise( (solve, reject) => { 
        request({
            url: url,
            json: true
        }, function (error, response, body) {        
            if (!error && response.statusCode === 200) {
                solve( body.opd )
            }
            else {
                reject( error )
            }
        })
    } )
    
}
module.exports.getAllOpd = getAllOpd;