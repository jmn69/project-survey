// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('../server/models/user');

// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) {

            // var newUser = new User();
            // newUser.local.email = email;
            // newUser.local.password = newUser.generateHash(password);
            // newUser.save(function (err) {
            //     if (err)
            //         throw err;
            //     return done(null, newUser);
            // });

            User.findOne({ 'local.email': email }, function (err, user) {
                if (err)
                    return done(err);

                if (!user)
                    return done(null, false, { message: `Email ${email} not found` });

                if (!user.validPassword(password))
                    return done(null, false, { message: "Invalid email or password" });

                return done(null, user);
            });

        }));
};
