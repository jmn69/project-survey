import React from 'react';
import * as redux from 'redux'
import { connect } from 'react-redux';
import { setRedirectUrl } from './actions.js'
import {browserHistory} from 'react-router';

class EnsureLoggedInContainer extends React.Component {
  componentDidMount() {
    const { dispatch, currentURL } = this.props

    if (!this.props.isLoggedIn) {
      dispatch(setRedirectUrl(currentURL))
      console.log(currentURL);
      browserHistory.replace("/login")
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return this.props.children
    } else {
      return null
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.app.loggedIn,
    currentURL: ownProps.location.pathname
  }
}

export default connect(mapStateToProps)(EnsureLoggedInContainer)