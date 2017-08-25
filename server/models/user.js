var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var conf = require('../../client/config');

var db = mongoose.createConnection(conf.connexionString);

// define the schema for our user model
var userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String,
    }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = db.model('User', userSchema);
