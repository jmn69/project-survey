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
import NavLinkRedux from './NavLink';
import { signOut } from '../actions';

export class MenuBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleSignOutClick = this.handleSignOutClick.bind(this);
        this.state = {}
    }

    render() {
        return (
            <Navbar color="primary" inverse toggleable>
                <NavbarBrand href="/">Surveasy</NavbarBrand>
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

    renderAdminBar() {
        const { loggedIn } = this.props;
        return loggedIn
            ? <Nav id="adminBar" navbar>
                <NavItem>
                    <NavLinkRedux
                        pagePath='/'
                        pageType='DASHBOARD'
                        label='Dashboard'
                    />
                </NavItem>
                <NavItem>
                    <NavLinkRedux
                        pagePath='/surveylist'
                        pageType='SURVEYLIST'
                        label='SurveyList'
                    />
                </NavItem>
                <NavItem>
                    <NavLinkRedux
                        pagePath='/settings'
                        pageType='SETTINGS'
                        label='Settings'
                    />
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
                    onClick={this.handleSignOutClick}
                >
                    Sign out
                </NavLink>
            </NavItem>
            : null;
    }

    handleSignOutClick() {
        this.props.signOut();
    }
}


export const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            signOut: signOut
        }, dispatch);
}
export const mapStateToProps = (state, ownProps) => {
    return {
        loggedIn: state.app.loggedIn
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
