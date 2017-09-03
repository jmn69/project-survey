import 'fetch-everywhere';
import { server, port } from '../config';
const API = {
    authentication(payload) {
        return fetch(`${server}/authentication`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(payload),
            headers: { 'content-type': 'application/json' }
        })
            .then(res => { return res.json(); })
    },

    authenticate() {
        return fetch(`${server}/authenticate`, {
            method: 'GET',
            credentials: "same-origin",
            headers: { 'content-type': 'application/json' }
        })
            .then(res => { return res.json(); });
    },

    logout() {
        return fetch(`${server}/logout`, {
            method: 'GET',
            credentials: "same-origin",
            headers: { 'content-type': 'application/json' }
        })
            .then(res => { return res.json(); });
    }
}

export default API;