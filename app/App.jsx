import React from 'react';
import { IndexLink, Link } from 'react-router';
import {Grid, Col, Row} from 'react-styled-flexboxgrid';
import MediaQuery from 'react-responsive';

const styles = {

};

export default class App extends React.Component {

  constructor(props) {
    super(props);
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
          <Col md={12} id="pageChildren">
            {this.props.children}
          </Col>
        </Row>
      </Grid>);
  }
}
