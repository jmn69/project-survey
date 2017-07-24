import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import SignIn from './pages/SignIn';
import AdminArea from './pages/AdminArea';
import RequireAuthentication from './auth/RequireAuthentication.js';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.loggedIn && nextProps.loggedIn) {
      console.log("login");
      const { currentURL, history } = this.props;
      if (currentURL)
        history.push(currentURL);
      else
        history.push('/');
    } else if (this.props.loggedIn && !nextProps.loggedIn) {
      console.log("logout");
    }
  }

  render() {
    return (
      <div>
        <Route path="/" component={RequireAuthentication(AdminArea)} />
        <Route path="/signin" component={SignIn} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.auth.loggedIn,
    currentURL: state.auth.currentURL
  }
}

export default withRouter(connect(mapStateToProps)(App))
