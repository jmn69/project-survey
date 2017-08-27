var defaultPort = 5000;
var ports = {
    development: defaultPort,
    production: process.env.PORT,
    test: 7000
};
// app port
var port = ports[process.env.NODE_ENV] ? ports[process.env.NODE_ENV] : defaultPort;

// base server url
var defaultServer = 'http://localhost:' + port;
var servers = {
    development: defaultServer,
    production: 'https://project-survey.herokuapp.com',
    test: defaultServer
};

module.exports = {
    DEV: process.env.NODE_ENV === 'development',
    port: ports[process.env.NODE_ENV] ? ports[process.env.NODE_ENV] : defaultPort,
    server: servers[process.env.NODE_ENV] ? servers[process.env.NODE_ENV] : defaultServer,
    connexionString : process.env.connexion_string,
    session_secret: process.env.session_secret
}