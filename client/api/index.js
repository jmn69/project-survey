import fetch from 'fetch-everywhere';
const API = {
    async authentication(payload) {
        return fetch('/authentication', {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(payload),
            headers: { 'content-type': 'application/json' },
        })
        .then(res => { return res.json(); });
    },
    
    async authenticate() {
        return fetch('/authenticate', {
            method: 'GET',
            credentials: "same-origin",
            headers: { 'content-type': 'application/json' },
          })
        .then(res => { return res.json(); });
    }
}

export default API;