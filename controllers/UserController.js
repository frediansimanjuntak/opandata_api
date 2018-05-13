const User          = require('../models').user;
const hakakses          = require('../models').hakakses;
const authService   = require('./../services/AuthService');
const PegController = require('./PegController');
const LogController = require('./LogController');

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    if(!body.unique_key && !body.username && !body.NIP){
        return ReE(res, 'Please enter an username or NIP number to register.');
    } else if(!body.password){
        return ReE(res, 'Please enter a password to register.');
    }else{
        let err, user;
        [err, user] = await to(authService.createUser(body));

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new user.'}, 201);
    }
}
module.exports.create = create;

const getOwn = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    LogController.create({username:req.user.username, nip:req.user.NIP, message:"own user", detail:""});
    return ReS(res, {user:user.toWeb()});
}
module.exports.getOwn = getOwn;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    User.findById(id, {
        include: [{
            model:hakakses,
            attributes:['id', 'hakakses']
        }]
    }).then( user => user.toWeb() )
    .then( user => Promise.all([
        PegController.getById(user.NIP)
    ]).then( ([peg]) => Object.assign( user, { peg } ) ) )
    .then( user => ReS(res, {data: user}, 201) );
}
module.exports.get = get;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    User.findAll({
        include: [{
            model:hakakses,
            attributes:['id', 'hakakses']
        }]
    })    
    // .then( users => Promise.all( users.map( u => u.toWeb() ).map( 
    //     u => {
    //         return m_peg.findById( u.id_peg )
    //         .then( m_peg_ => Object.assign( u, { peg: m_peg_ } ) )
    //         .then( user_info => 
    //             m_hakakses.findById(user_info.id_hakaskses)
    //             .then( m_hakakses_ => Object.assign( user_info, { hakakses: m_hakakses_ } ) ) 
    //         )
    //     }
    // ) ) )
    .then( users => Promise.all( users.map( u => u.toWeb() ).map( u => {
        return PegController.getById(u.NIP)
        .then( result => Object.assign( u, { peg: result } ) )
    } ) ).then(function(results) {
        LogController.create({username:req.user.username, nip:req.user.NIP, message:"get all user", detail:""});
        return ReS(res, { data:results }, 201)
    } ) )
}
module.exports.getAll = getAll;

const updateOwn = async function(req, res){
    let err, user, data    
    user = req.user;
    data = req.body;
    user.set(data);
    [err, user] = await to(user.save());
    if(err){
        if(err.message=='Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err);
    }
    LogController.create({username:req.user.username, nip:req.user.NIP, message:"update own account", detail:""});
    return ReS(res, {message :'Updated User: '+user.username});
}
module.exports.updateOwn = updateOwn;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    let user_info = req.body;
    
    User.findById(id)
    .then( user => 
        user.set(user_info)
    )
    .then ( user_data => user_data.save())
    .then ( result => ReS( res, {message :'Updated User: '+result.username}, 201 ) )
}
module.exports.update = update;

const remove = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user, err;
    let id = req.params.id;
    [err, user] = await to(User.destroy({
        where: {
          id: id
        },
        truncate: false
    }));
    if(err) return ReE(res, 'error occured trying to delete user');    
    LogController.create({username:req.user.username, nip:req.user.NIP, message:"remove user", detail:""});
    return ReS(res, {message:'Deleted User'}, 204);
}
module.exports.remove = remove;


const login = async function(req, res){
    const body = req.body;
    let err, user;
    [err, user] = await to(authService.authUser(req.body));
    if(err) return ReE(res, err, 422);
    LogController.create({username:user.username, nip:user.NIP, message:"login", detail:""});
    return ReS(res, {token:user.getJWT(), user:user.toWeb()});
}
module.exports.login = login; 

const checkuser = function(id_user, id_dataset_opd) {
    return new Promise( (solve, reject) => {
        User.findById(id_user).then( user => user.toWeb() )
        .then( user => Promise.all([
            PegController.getById(user.NIP)
        ]).then( ([peg]) => Object.assign( user, { peg } ) ) )
        .then( user => {
            if(user.id_hakakses == 3) {             
                if(user.peg.id_opd == id_dataset_opd){
                    solve (true);
                }   
                else {
                    solve (false);
                }
            }
            else{
                solve (true);
            }
        });
    } )
}
module.exports.checkuser = checkuser;

const getOpdUser = function(id_user) {
    return new Promise( (solve, reject) => {
        User.findById(id_user).then( user => user.toWeb() )
        .then( user => Promise.all([
            PegController.getById(user.NIP)
        ]).then( ([peg]) => Object.assign( user, { peg } ) ) )
        .then( user => {
            if(user){
                solve(user.peg.id_opd);
            }
            else {
                solve("null");
            }
        });
    } )
}
module.exports.getOpdUser = getOpdUser;