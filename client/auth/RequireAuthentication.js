import React, { Component, PropTypes } from 'react';
import * as redux from 'redux'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { authenticate, setRedirectUrl } from './actions.js';

export default (ChildComponent) => {
  class AuthenticatedComponent extends Component {

    componentDidMount() {
      const { currentURL, history } = this.props
      this.props.authenticate().then(data => {
        if (!data) {
          this.props.setRedirectUrl(currentURL);
          history.push("/signin")
        }
      });
    }

    componentDidUpdate() {
      const { currentURL, history } = this.props
      this.props.authenticate().then(data => {
        if (!data) {
          this.props.setRedirectUrl(currentURL);
          history.push("/signin")
        }
      });
    }

    render() {
      const { isLoggedIn } = this.props
      return (isLoggedIn
        ? <ChildComponent {...this.props} />
        : null
      )
    }
  }

  const mapStateToProps = (state, ownProps) => {
    return {
      isLoggedIn: state.auth.loggedIn,
      currentURL: ownProps.location.pathname
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      authenticate: authenticate,
      setRedirectUrl: setRedirectUrl
    }, dispatch);
  }

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent))
}