import React from 'react';
import { connect } from 'react-redux';

import AdminArea from './AdminArea';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AdminArea/>
    );
  }
}