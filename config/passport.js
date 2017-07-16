var LocalStrategy = require('passport-local').Strategy;
var User = require('../server/models/user');

module.exports = function (passport) {

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
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
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
