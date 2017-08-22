export const DEV = process.env.NODE_ENV === 'development';
// app port
export const port = process.env.PORT || 8000;
// mongo db connexion string
export const connexionString = process.env.connexion_string;
// session secret
export const session_secret = process.env.session_secret;
// base server url
export const server = DEV ? `http://localhost:${port}` : 'https://project-survey.herokuapp.com';