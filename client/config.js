export const DEV = process.env.NODE_ENV === 'development';

const defaultPort = 5000;
const ports = {
    development: defaultPort,
    production: process.env.PORT,
    test: 7000
};
// app port
export const port = ports[process.env.NODE_ENV] ? ports[process.env.NODE_ENV] : defaultPort;

// base server url
const defaultServer = `http://localhost:${port}`;
const servers = {
    development: defaultServer,
    production: 'https://project-survey.herokuapp.com',
    test: defaultServer
};
export const server = servers[process.env.NODE_ENV] ? servers[process.env.NODE_ENV] : defaultServer;

// mongo db connexion string
export const connexionString = process.env.connexion_string;
// session secret
export const session_secret = process.env.session_secret;