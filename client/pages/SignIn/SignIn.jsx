import React from 'react';
import {authentication} from '../../auth/actions.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {createStyleSheet} from 'material-ui/styles';
import {withStyles} from 'material-ui/styles';
import {blue} from 'material-ui/colors';

const styleSheet = createStyleSheet('Home', (theme) => ({
    root: {
        backgroundColor: blue[700],
        minHeight: "100vh"
    }
}));

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
        this.setState({email: "jmichon69@gmail.com", password: "test"});
    }

    onEmailChange(ev) {
        this.setState({email: ev.target.value});
    }


    onPasswordChange(ev) {
        this.setState({password: ev.target.value});
    }

    onLoginSubmit(event) {
        event.preventDefault()

        var payload = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.authentication(payload);
    }

    render() {
        const classes = this.props.classes;

        return (
            <Grid
                container
                align="center"
                direction="row"
                justify="center"
                className={classes.root}
            >
                <Grid item xs={7} sm={5}>
                    <Paper>
                        <Grid
                            container
                            align="center"
                            direction="row"
                            justify="center"
                            gutter={24}
                        >
                            <Grid item xs={3} sm={3}>
                                <Typography type="display1" gutterBottom>
                                    Sign in
                                </Typography>
                            </Grid>
                            <Grid item xs={10} sm={10}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    marginForm
                                    fullWidth
                                    onChange={this.onEmailChange}
                                />
                            </Grid>
                            <Grid item xs={10} sm={10}>
                                <TextField
                                    id="password"
                                    label="Password"
                                    marginForm
                                    fullWidth
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={this.onPasswordChange}
                                />
                            </Grid>
                            <Grid item xs={3} sm={3}>
                                <Button onClick={this.onLoginSubmit} raised color="primary">
                                    Connexion
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {currentURL: state.auth.currentURL}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({authentication: authentication}, dispatch);
}

export default withStyles(styleSheet)(connect(mapStateToProps, mapDispatchToProps)(SignIn))