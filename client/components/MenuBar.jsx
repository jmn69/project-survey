import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Collapse from 'reactstrap/lib/Collapse';
import Navbar from 'reactstrap/lib/Navbar';
import NavbarToggler from 'reactstrap/lib/NavbarToggler';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import { goToPage, signOut } from '../actions';

export class MenuBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Navbar color="primary" inverse toggleable>
                <NavbarBrand href="/">Surveys</NavbarBrand>
                {this.renderAdminBar()}
                <Nav className="ml-auto" navbar>
                    {this.renderSignOut()}
                    <NavItem>
                        <NavLink href="https://github.com/jmn69/project-survey">
                            Github
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }

    active(currentPath, path) {
        return currentPath === path ? "#18BC9C" : "";
    }

    handleNavClick(page) {
        this.props.goToPage(page);
    }

    renderAdminBar() {
        const { path, loggedIn } = this.props;
        return loggedIn
            ? <Nav id="adminBar" navbar>
                <NavItem>
                    <NavLink
                        style={{ color: this.active(path, '/') }}
                        onClick={this.handleNavClick('DASHBOARD')}
                        href="#"
                    >
                        Dashboard
            </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        style={{ color: this.active(path, '/surveylist') }}
                        onClick={this.handleNavClick('SURVEYLIST')}
                        href="#"
                    >
                        SurveyList
            </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        style={{ color: this.active(path, '/settings') }}
                        onClick={this.handleNavClick('SETTINGS')}
                        href="#"
                    >
                        Settings
            </NavLink>
                </NavItem>
            </Nav>
            : null;
    }

    renderSignOut() {
        const { loggedIn, signOut } = this.props;
        return loggedIn
            ? <NavItem>
                <NavLink
                    id='signout-link'
                    href="#"
                    onClick={() => signOut()}
                >
                    Sign out
                </NavLink>
            </NavItem>
            : null;
    }
}


export const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            goToPage: goToPage,
            signOut: signOut
        }, dispatch);
}
export const mapStateToProps = (state, ownProps) => {
    return {
        path: state.location.pathname,
        loggedIn: state.app.loggedIn
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
