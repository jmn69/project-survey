import fetch from 'fetch-everywhere';
import {server} from 'client/config';
const API = {
    async authentication(payload) {
        return fetch(`${server}/authentication`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(payload),
            headers: { 'content-type': 'application/json' },
        })
        .then(res => { return res.json(); });
    },
    
    async authenticate() {
        return fetch(`${server}/authenticate`, {
            method: 'GET',
            credentials: "same-origin",
            headers: { 'content-type': 'application/json' },
          })
        .then(res => { return res.json(); });
    }
}

export default API;