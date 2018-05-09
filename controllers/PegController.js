const request = require("request");

const url = "http://tanjungpinangkota.go.id/api/peg";

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    request({
        url: url,
        json: true
    }, function (error, response, body) {
    
        if (!error && response.statusCode === 200) {
            return ReS(res, {data:body.pegawai}, 201);
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
            return ReS(res, {data:body.pegawai[0]}, 201);
        }
    })
}
module.exports.get = get;

const getById = function(id) {
    return new Promise( (solve, reject) => {
        request({
            url: url+"/"+id,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                // return body.pegawai[0];
                solve( body.pegawai[0] )
            } else {
                reject( error )
            }
        })
    } )
}

module.exports.getById = getById;