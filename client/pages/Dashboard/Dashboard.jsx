import React from 'react';
import { Col, Row } from 'react-styled-flexboxgrid';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router';

const styles = {

}

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                Dashboard
                <br />
                <Link to="/admin/surveylist">surveys</Link>
                {this.props.children}
            </div>);
    }
}