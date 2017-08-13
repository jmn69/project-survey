import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authentication, goTo } from '../actions';

// const styleSheet = createStyleSheet('Signin', (theme) => ({
//     root: {
//         backgroundColor: theme.palette.primary[500],
//         minHeight: "100vh",
//     },
//     title: {
//         textAlign: "center"
//     },
//     paper: {
//         padding: "2rem",
//         borderRadius: "4px"
//     }
// }));

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

        this.props.authentication(payload).then(data => {
            const url = this.props.currentUrl ? this.props.currentUrl : "/";
            this.props.goTo(url);
        });
    }

    render() {
        const classes = this.props.classes;

        return (
            <div>
                Administration area
                <input
                    id="email"
                    onChange={this.onEmailChange}
                    value={this.state.email}
                />
                <input
                    id="password"
                    type="password"
                    onChange={this.onPasswordChange}
                    value={this.state.password}
                />
                <button onClick={this.onLoginSubmit} >
                    Connexion
                </button>
            </div>
        );
    }

    // render() {
    //     const classes = this.props.classes;

    //     return (
    //         <Grid
    //             container
    //             align="center"
    //             direction="row"
    //             justify="center"
    //             className={classes.root}
    //         >
    //             <Grid item xs={4} sm={4}>
    //                 <Paper className={classes.paper}>
    //                     <Grid
    //                         container
    //                         align="center"
    //                         direction="row"
    //                         justify="center"
    //                         gutter={24}
    //                     >
    //                         <Grid item xs={12} sm={12} className={classes.title}>
    //                             <Typography type="headline" gutterBottom>
    //                                 Administration area
    //                             </Typography>
    //                         </Grid>
    //                         <Grid item xs={10} sm={10}>
    //                             <TextField
    //                                 id="email"
    //                                 label="Email"
    //                                 fullWidth
    //                                 onChange={this.onEmailChange}
    //                                 value={this.state.email}
    //                             />
    //                         </Grid>
    //                         <Grid item xs={10} sm={10}>
    //                             <TextField
    //                                 id="password"
    //                                 label="Password"
    //                                 fullWidth
    //                                 type="password"
    //                                 autoComplete="current-password"
    //                                 onChange={this.onPasswordChange}
    //                                  value={this.state.password}
    //                             />
    //                         </Grid>
    //                         <Grid item xs={12} sm={12}>
    //                             <Grid
    //                                 container
    //                                 align="center"
    //                                 direction="row"
    //                                 justify="center"
    //                                 gutter={24}
    //                             >
    //                                 <Grid item xs={3} sm={3}>
    //                                     <Button onClick={this.onLoginSubmit} raised color="accent">
    //                                         Connexion
    //                                     </Button>
    //                                 </Grid>
    //                             </Grid>
    //                         </Grid>
    //                     </Grid>
    //                 </Paper>
    //             </Grid>
    //         </Grid>
    //     );
    // }
}

const mapStateToProps = (state, ownProps) => {
    return { currentUrl: state.auth.currentUrl }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            authentication: authentication,
            goTo: goTo
        }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)