const Informasi_situs = require('../models').informasi_situs;
const LogController = require('./LogController');
const path = require('path');

const create = async function(req, res){
    let err, informasi;
    data = {
        isi:req.body.isi,
        photo:req.file.filename
    }
    console.log(data);
    [err, informasi] = await to(Informasi_situs.create(data));
    if(err) return ReE(res, err, 422);
    return ReS(res, {data:informasi.toWeb()});
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    Informasi_situs.findAll().then(informasi => Promise.all( informasi.map( i => i.toWeb() ).map( i => {
        console.log(i);
        return getFile(i.photo).then(result => Object.assign( i, { file: result } ))
    } ) ) 
    .then(results => {
        return ReS(res, {data:results}, 201);
    } ) )
}
module.exports.getAll = getAll;

const getFile = async function(photo){
    return new Promise( (solve, reject) => {
        let file = path.join(__dirname, '../uploads/'+ photo);
        // var file = __dirname + '/../../uploads/'+ photo;
        solve(file);
    })
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    Informasi_situs.findById(id).then(informasi => informasi.toWeb()).then(informasi => Promise.all([
        getFile(informasi.photo)
    ]).then( ([file]) => Object.assign( informasi, { file } ) ) )
    .then( informasi => ReS(res, {data: informasi}, 201) );
        // ReS(res, {data:informasi.toWeb()}) 
    // );
}
module.exports.get = get;

const update = async function(req, res){
    data = {
        isi:req.body.isi,
        photo:req.file.filename
    }
    console.log(data);
    let id = req.params.id;
    Informasi_situs.update(data, { where: { id: id }
    }).then(informasi => {    
        Informasi_situs.findById(id).then(informasi => {    
            LogController.create({username:req.user.username, nip:req.user.NIP, message:"update informasi"});
            return ReS(res, {data:informasi}, 201);
        });
    });
}
module.exports.update = update;

const remove = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    Informasi_situs.destroy({
        where: {
          id: id
        },
        truncate: false
    }).then(informasi => {    
        LogController.create({username:req.user.username, nip:req.user.NIP, message:"remove informasi"});
        return ReS(res, {message:'Deleted informasi'}, 204);
    });
}
module.exports.remove = remove;