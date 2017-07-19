import React from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import {Link} from 'react-router';
import Grid from 'material-ui/Grid';

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Grid
                container
                align="center"
                direction="row"
                justify="center"
            >
                <Grid item xs={10} sm={8}>
                    <Paper>
                        <Typography type="headline" gutterBottom>
                            Bienvenue !
                        </Typography>
                        <Link to="/admin">Admin</Link>
                    </Paper>
                </Grid>
            </Grid>);
    }
}