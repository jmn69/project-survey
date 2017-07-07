import React from 'react';
import { Col, Row } from 'react-styled-flexboxgrid';
import MediaQuery from 'react-responsive';

const styles = {
    loginMessageStyle: {
        color: "blue"
    }
}

export default class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
    }

    //Todo remove
    componentDidMount() {
        this.setState({ email: "jmichon69@gmail.com", password: "test" });
    }

    onEmailChange(ev) {
        this.setState({ email: ev.target.value });
    }


    onPasswordChange(ev) {
        this.setState({ password: ev.target.value });
    }

    onLoginSubmit(event) {
        event.preventDefault()

        var payload = {
            email: this.state.email,
            password: this.state.password
        };

        var data = new FormData();
        data.append("json", JSON.stringify(payload));

        fetch("/login",
            {
                method: "POST",
                body: JSON.stringify(payload),
                headers: { 'content-type': 'application/json' },
            })
            .then(function (res) { return res.json(); })
            .then(function (data) { alert(JSON.stringify(data)) })
    }

    render() {
        return (
            <div>
                <h2>Sign in</h2>
                <form onSubmit={this.onLoginSubmit}>
                    <input type="email" onChange={this.onEmailChange} placeholder="Email" /><br />
                    <input onChange={this.onPasswordChange} type="password" placeholder="Password" /><br />
                    <input type="submit" value="Login" /> <span style={styles.loginMessageStyle}>Go</span>
                </form>
            </div>
        );
    }
}