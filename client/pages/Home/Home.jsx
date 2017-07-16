import React from 'react';
import { Col, Row } from 'react-styled-flexboxgrid';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router';

const styles = {

}



export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <Link to="/admin">Admin</Link>
                <br/>
                hello world
            </div>);
    }
}