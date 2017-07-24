import React from 'react';
import Typography from 'material-ui/Typography';

export default class Settings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <Typography type="body1">
                Settings
                </Typography>
            </div>);
    }
}