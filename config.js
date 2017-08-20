var config = {};

// mongo db connexion string
config.connexionString = process.env.connexion_string;
// session secret
config.session_secret = process.env.session_secret;
module.exports = config;