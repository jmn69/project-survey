import React from 'react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router';
import Typography from 'material-ui/Typography';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <Typography type="body1">
                Dashboard
                </Typography>
            </div>);
    }
}