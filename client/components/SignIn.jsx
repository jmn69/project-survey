import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Container, Row, Col, Button,
    Form, FormGroup, Label, Input, FormText,
    Card, CardHeader, CardBlock
} from 'reactstrap';

import { authentication, goTo } from '../actions';
import styles from '../css/Signin.css';

export class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
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

    onLoginClick() {
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
        return (
            <Container fluid>
                <Row className={`${styles.root} align-items-center justify-content-center`}>
                    <Col md="4">
                        <Card>
                            <CardHeader className="card-primary card-inverse">Manage your surveys</CardHeader>
                            <CardBlock className="bg-faded">
                                <Form>
                                    <FormGroup>
                                        <Label for="signin-email">Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            id="signin-email"
                                            placeholder="enter your email"
                                            onChange={this.onEmailChange}
                                            value={this.state.email}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="signin-password">Password</Label>
                                        <Input
                                            type="password"
                                            name="password"
                                            id="signin-password"
                                            placeholder="enter your password"
                                            onChange={this.onPasswordChange}
                                            value={this.state.password}
                                        />
                                    </FormGroup>
                                    <Row className="justify-content-end">
                                        <Col md="auto">
                                            <Button
                                                onClick={this.onLoginClick}
                                                color="success"

                                            >
                                                Connexion
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export const mapStateToProps = (state, ownProps) => {
    return { currentUrl: state.auth.currentUrl }
}

export const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            authentication: authentication,
            goTo: goTo
        }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)