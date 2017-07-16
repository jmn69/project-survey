import React from 'react';
import { IndexLink, Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import MediaQuery from 'react-responsive';

const styles = {

};

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.loggedIn && nextProps.loggedIn) {
      console.log("login");
      const { currentURL } = this.props;
      if (currentURL)
        browserHistory.push(currentURL);
      else
        browserHistory.push('/');
    } else if (this.props.loggedIn && !nextProps.loggedIn) {
      console.log("logout");
    }
  }

  render() {
    return (
      <Grid>

        {/* -------------- Smartphone et tablette ---------------- */}

        <MediaQuery query='(max-width : 1024px)'>

        </MediaQuery>

        {/* -------------- PC & TV ---------------- */}

        <MediaQuery query='(min-width : 1024px)'>

        </MediaQuery>

        <Row>
          <p></p>
          <Col md={12} id="pageChildren">
            {this.props.children}
          </Col>
        </Row>
      </Grid>);
  }
}

const mapStateToProps = (state, ownProps) => {
  return { loggedIn: state.auth.loggedIn }
}

export default connect(mapStateToProps)(App)
