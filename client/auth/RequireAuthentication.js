import React, { Component, PropTypes } from 'react';
import * as redux from 'redux'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { authenticate, setRedirectUrl } from './actions.js';

export default (ChildComponent) => {
  class AuthenticatedComponent extends Component {

    componentDidMount() {
      const { currentURL } = this.props
      this.props.authenticate().then(data => {
        if (!this.props.isLoggedIn) {
          this.props.setRedirectUrl(currentURL);
          browserHistory.replace("/signin")
        }
      });
    }

    componentDidUpdate() {
      const { currentURL } = this.props
      this.props.authenticate().then(data => {
        if (!this.props.isLoggedIn) {
          this.props.setRedirectUrl(currentURL);
          browserHistory.replace("/signin")
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

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent)
}