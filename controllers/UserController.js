const User          = require('../models').user;
const m_peg          = require('../models').m_peg;
const m_hakakses          = require('../models').m_hakakses;
const authService   = require('./../services/AuthService');
const fs = require('fs')
  , Log = require('log')
  , log = new Log('debug', fs.createWriteStream('useractivity.log'));

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    if(!body.unique_key && !body.email && !body.phone){
        return ReE(res, 'Please enter an email or phone number to register.');
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
    log.info('user '+req.user.username+' get own data from user with id user'+ user.id);
    return ReS(res, {user:user.toWeb()});
}
module.exports.getOwn = getOwn;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    User.findById(id).then( user => user.toWeb() )
    .then( user => Promise.all([
        m_peg.findById(user.id_peg),
        m_hakakses.findById(user.id_hakaskses)
    ]).then( ([peg, hakakses]) => Object.assign( user, { peg, hakakses } ) ) )
    .then( user => ReS(res, {data: user}, 201) );
}
module.exports.get = get;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    User.findAll()
    .then( users => Promise.all( users.map( u => u.toWeb() ).map( 
        u => {
            return m_peg.findById( u.id_peg )
            .then( m_peg_ => Object.assign( u, { peg: m_peg_ } ) )
            .then( user_info => 
                m_hakakses.findById(user_info.id_hakaskses)
                .then( m_hakakses_ => Object.assign( user_info, { hakakses: m_hakakses_ } ) ) 
            )
        }
    ) ) )
    .then( users => {
        // log.info('user '+req.user.username+' get all data from user');
        return ReS(res, { data:users })
    } )
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
    log.info('user '+user.username+' update user with id user'+ user.id);
    return ReS(res, {message :'Updated User: '+user.email});
}
module.exports.updateOwn = updateOwn;

const update = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;
    let user_info = req.body;
    User.update(user_info, { where: { id: id }
    }).then(field => {
        log.info('user '+req.user.username+' update field with id field'+ id);
        return ReS(res, {data:field}, 201);
    });
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

    return ReS(res, {message:'Deleted User'}, 204);
}
module.exports.remove = remove;


const login = async function(req, res){
    const body = req.body;
    let err, user;
    [err, user] = await to(authService.authUser(req.body));
    if(err) return ReE(res, err, 422);
    log.info('user '+user.username+' login');
    return ReS(res, {token:user.getJWT(), user:user.toWeb()});
}
module.exports.login = login;