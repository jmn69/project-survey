import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Container from 'reactstrap/lib/Container';
import Button from 'reactstrap/lib/Button';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Form from 'reactstrap/lib/Form';
import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';
import Input from 'reactstrap/lib/Input';
import FormText from 'reactstrap/lib/FormText';
import Card from 'reactstrap/lib/Card';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardBlock from 'reactstrap/lib/CardBlock';
import FormFeedback from 'reactstrap/lib/FormFeedback';

import { authentication, goTo } from '../../actions';
import styles from '../../css/Signin.css';

export class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            errors: null
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

    async onLoginClick() {
        var payload = {
            email: this.state.email,
            password: this.state.password
        };

        const data = await this.props.authentication(payload);
        if (data.success) {
            const url = this.props.currentUrl ? this.props.currentUrl : "/";
            this.props.goTo(url);
        }
        else {
            const errors = { ...this.state.errors, authentication: "Mmmh, il y a une erreur avec l'email ou le password" };
            this.setState({ errors: errors });
        }
    }

    renderError(property) {
        const error = this.state.errors && this.state.errors[property];
        if (error) {
            return (
                <FormText color="danger">{error}</FormText>
            );
        }
    }

    renderLoading() {
        return this.props.isLoading
            ? <i className="fa fa-spinner fa-pulse fa-1x fa-fw" style={{ marginLeft: "1rem" }} aria-hidden="true"></i>
            : null;
    }

    render() {
        return (
            <Container fluid>
                <Row className={`${styles.root} align-items-center justify-content-center`}>
                    <Col xs="12" sm="8" md="4">
                        <Card>
                            <CardHeader className="card-primary card-inverse">Manage your surveys</CardHeader>
                            <CardBlock className="bg-faded">
                                <br />
                                <Form>
                                    <FormGroup row className="align-items-center justify-content-center">
                                        <Col xs="12" sm="12" md="10" lg="8">
                                            <Input
                                                type="email"
                                                name="email"
                                                id="signin-email"
                                                placeholder="Email"
                                                onChange={this.onEmailChange}
                                                value={this.state.email}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <br />
                                    <FormGroup row className="align-items-center justify-content-center">
                                        <Col xs="12" sm="12" md="10" md="8">
                                            <Input
                                                type="password"
                                                name="password"
                                                id="signin-password"
                                                placeholder="Password"
                                                onChange={this.onPasswordChange}
                                                value={this.state.password}
                                            />
                                            {this.renderError("authentication")}
                                        </Col>
                                    </FormGroup>
                                    <br />
                                    <Row className="justify-content-end">
                                        <Col md="auto">
                                            <Button
                                                onClick={this.onLoginClick}
                                                color="success"

                                            >
                                                Connexion
                                                {this.renderLoading()}
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
    return {
        currentUrl: state.app.currentUrl,
        isLoading: state.app.isFetching
    }
}

export const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            authentication: authentication,
            goTo: goTo
        }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)