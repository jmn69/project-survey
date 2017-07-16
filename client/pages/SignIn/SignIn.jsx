import React from 'react';
import { authentication } from '../../auth/actions.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

const styles = {
    loginMessageStyle: {
        color: "blue"
    }
}

class SignIn extends React.Component {
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

        this.props.authentication(payload);

        // fetch("/authentication",
        //     {
        //         method: "POST",
        //         credentials: "include",
        //         body: JSON.stringify(payload),
        //         headers: { 'content-type': 'application/json' },
        //     })
        //     .then(res => { return res.json(); })
        //     .then(data => {
        //         const {currentURL} = this.props;
        //         this.setState({ loginMessage: data.message });
        //         this.props.login();
        //     })
    }

    render() {
        return (
            <div>
                <h2>Sign in</h2>
                <form onSubmit={this.onLoginSubmit}>
                    <input type="email" onChange={this.onEmailChange} placeholder="Email" /><br />
                    <input onChange={this.onPasswordChange} type="password" placeholder="Password" /><br />
                    <input type="submit" value="Login" /> <span style={styles.loginMessageStyle}>{this.state.loginMessage}</span>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { currentURL: state.auth.currentURL }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ authentication: authentication }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)