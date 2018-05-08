const m_opd = require('../models').m_opd;
var request = require("request")

const url = "http://tanjungpinangkota.go.id/api/unitkerjA";

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    request({
        url: url,
        json: true
    }, function (error, response, body) {
    
        if (!error && response.statusCode === 200) {
            return ReS(res, {data:body.opd}, 201);
        }
    })
}
module.exports.getAll = getAll;

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