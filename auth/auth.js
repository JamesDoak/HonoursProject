const passport = require('passport');

const Strategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');

const userModel = require('../models/userModel');


exports.init = function(app){

    
    // setup password
            passport.use(new Strategy(

                //may need to change -- username -- to user.


                function(username, password, cb) { // cb is callback
                userModel.lookup(username, function(err, user) {
                    console.log('lookup', username); //testing
                    if (err) {
                    console.log('error looking up user', err);
                    return cb(err);
                    }
                    if (!user) {
                    console.log('user ', username, ' not found');
                    return cb(null, false);
                    }
                    //compare provided password with stored password
                    bcrypt.compare(password, user.password, function(err, result) 
                    {
                        if (result) {
                        cb(null, user);
                        } else {
                        cb(null, false);
                        }
                    });
                });
            }));

                //For session handling we need serialize and deserialize users.
                //Simplest is just to use the 'username' field. 
            passport.serializeUser(function(user, cb)
            {
                    cb(null, user.user);
            });

            passport.deserializeUser(function(id, cb)
            {
                userModel.lookup(id, function(err, user) {
                    if (err) 
                    {
                         return cb(err); 
                    }
                    // console.log('user is: ', user);
                    cb(null, user);
                });
            });

}; //close init

exports.authorize = function(redirect) {
    return passport.authenticate('local',
    { failureRedirect: redirect}
    );
};
