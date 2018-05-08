var request = require("request")

const url = "http://tanjungpinangkota.go.id/api/berita_populer";

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    request({
        url: url,
        json: true
    }, function (error, response, body) {
    
        if (!error && response.statusCode === 200) {
            return ReS(res, {data:body.berita}, 201);
        }
    })
}
module.exports.getAll = getAll;