import React, { Component, PropTypes } from 'react';
import * as redux from 'redux'
import { connect } from 'react-redux';
import { setRedirectUrl } from './actions.js'
import { browserHistory } from 'react-router';

export default (ChildComponent) => {
  class AuthenticatedComponent extends Component {

    componentDidMount() {
      const { dispatch, currentURL } = this.props

      if (!this.props.isLoggedIn) {
        dispatch(setRedirectUrl(currentURL))
        console.log(currentURL);
        browserHistory.replace("/signin")
      }
    }

    render() {
      const { isLoggedIn } = this.props
      return (isLoggedIn
        ? <ChildComponent {...this.props} />
        : null
      )
    }
  }

  function mapStateToProps(state, ownProps) {
    return {
      isLoggedIn: state.auth.loggedIn,
      currentURL: ownProps.location.pathname
    }
  }

  return connect(mapStateToProps)(AuthenticatedComponent)
}