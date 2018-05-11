var Log = require('log')
  , fs = require('fs')
  , write = fs.createWriteStream(__dirname + '/useractivity.txt')
  , log = new Log('debug', write);

const create = function(req, res){ 
    let username = req.username;
    let nip = req.nip;
    let message = req.message;   

    let dateTime = require('node-datetime');
    let dt = dateTime.create();
    let formatted = dt.format('Y-m-d H:M:S');
    log.info('['+ formatted +'] ['+ nip +' - '+ username +'] ['+message+']');
}
module.exports.create = create;

const get = function(req, res){ 
    fs = require('fs')
    fs.readFile(__dirname + '/useractivity.txt', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        return ReS(res, {data:data}, 201);
    });
}
module.exports.get = get;