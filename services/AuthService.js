const user 			= require('./../models').user;
const validator     = require('validator');

const getUniqueKeyFromBody = function(body){// this is so they can send in 3 options unique_key, email, or phone and it will work
    console.log("body_"+body.unique_key);
    let unique_key = body.unique_key;
    if(typeof unique_key==='undefined'){
        if(typeof body.username != 'undefined'){
            unique_key = body.username
        }else{
            unique_key = null;
        }
    }
    return unique_key;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createUser = async function(userInfo){
    let unique_key, auth_info, err;

    auth_info={}
    auth_info.status='create';

    unique_key = getUniqueKeyFromBody(userInfo);
    if(!unique_key) TE('An email or phone number was not entered.');
    [err, user_] = await to(user.create(userInfo));
    if(err) {
        console.log(err); TE('user already exists');
    }

    return user_;
    // if(validator.isEmail(unique_key)){
    //     auth_info.method = 'email';
    //     userInfo.email = unique_key;

    //     [err, user] = await to(User.create(userInfo));
    //     if(err) console.log(err); TE('user already exists with that email');

    //     return user;

    // }else if(validator.isMobilePhone(unique_key, 'any')){//checks if only phone number was sent
    //     auth_info.method = 'phone';
    //     userInfo.phone = unique_key;

    //     [err, user] = await to(User.create(userInfo));
    //     if(err) TE('user already exists with that phone number');

    //     return user;
    // }else{
    //     TE('A valid email or phone number was not entered.');
    // }
}
module.exports.createUser = createUser;

const authUser = async function(userInfo){//returns token
    let unique_key;
    let auth_info = {};
    auth_info.status = 'login';
    unique_key = getUniqueKeyFromBody(userInfo);

    if(!unique_key) TE('Please enter username or email or phone number to login');


    if(!userInfo.password) TE('Please enter a password to login');

    let user_;
    if(validator.isEmail(unique_key)){
        auth_info.method='email';

        [err, user_] = await to(user.findOne({where:{email:unique_key}}));
        if(err) TE(err.message);

    }else if(validator.isMobilePhone(unique_key, 'any')){//checks if only phone number was sent
        auth_info.method='phone';

        [err, user_] = await to(user.findOne({where:{phone:unique_key }}));
        if(err) TE(err.message);

    }
    else if(unique_key){
        auth_info.method='username';

        [err, user_] = await to(user.findOne({where:{username:unique_key }}));
        if(err) TE(err.message);

    }else{
        TE('A valid username or email or phone number was not entered');
    }

    if(!user_) TE('Not registered');

    [err, user_] = await to(user_.comparePassword(userInfo.password));

    if(err) TE(err.message);

    return user_;

}
module.exports.authUser = authUser;