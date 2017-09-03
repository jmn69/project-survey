import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavLinkBs from 'reactstrap/lib/NavLink';
import { goToPage } from '../actions';

export class NavLink extends React.Component {
    constructor(props) {
        super(props)
        this.handleNavClick = this.handleNavClick.bind(this);
    }

    render() {
        const { path, pagePath, label } = this.props;
        return (
            <NavLinkBs
                style={{ color: this.active(path, this.props.pagePath) }}
                onClick={this.handleNavClick}
                href="#"
            >
                {this.props.label}
            </NavLinkBs>
        );
    }

    active(currentPath, path) {
        return currentPath === path ? "#18BC9C" : "";
    }

    handleNavClick() {
        const { goToPage, pageType } = this.props;
        goToPage(pageType);
    }
}


export const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            goToPage: goToPage
        }, dispatch);
}
export const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        path: state.location.pathname
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavLink)
