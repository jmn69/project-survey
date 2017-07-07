import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SignIn from './pages/SignIn';

export default (ChildComponent) => {
  class AuthenticatedComponent extends Component {

    render () {
      const { hasAuthToken } = this.props
      return (hasAuthToken
        ? <ChildComponent {...this.props} />
        : <SignIn />
      )
    }
  }

  const mapStateToProps = ({session}) => (session)

  return connect(mapStateToProps)(AuthenticatedComponent)
}