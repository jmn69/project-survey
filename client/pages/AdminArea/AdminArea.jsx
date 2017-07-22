import React from 'react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router';
import Typography from 'material-ui/Typography';
import { withTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
import DashboardIcon from 'material-ui-icons/Dashboard';
import ListIcon from 'material-ui-icons/List';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

const styleSheet = createStyleSheet('AdminArea', (theme) => ({
    root: {
        minHeight: "100vh"
    },
    menu: {
        backgroundColor: theme.palette.primary[500]
    },
    menuTitle: {
        color: grey[50],
        textAlign: "center",
        marginTop: "30px",
        marginBottom: "30px"
    },
    menuDescription: {
        textAlign: "left",
        color: grey[50],
        marginLeft: "18px"
    },
    divider: {
        height: "1px",
        backgroundColor: grey[50],
        marginLeft: "4px",
        marginRight: "4px"
    },
    menuIcon: {
        color: theme.palette.accent[500]
    },
    menuItem: {
        color: grey[50],
        fontSize: "16px",
        fontWeight: 400,
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        lineHeight: "24px"

    }
}));

class AdminArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid
                container
                direction="row"
                className={classes.root}
            >
                <Grid item xs={2} sm={2} className={classes.menu}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        align="center"
                    >
                        <Grid item xs={12} sm={12}>
                            <Typography className={classes.menuTitle} type="headline" gutterBottom>
                                PROJECT SURVEY
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography className={classes.menuDescription} type="body1" gutterBottom>
                                Petit projet POC sur une stack technique complète.<br/><br/>
                                    Objectif : <br/>
                                    - Créer rapidement un questionnaire en ligne diffusable avec un lien permanent.<br/>
                                    - Exploiter les résultats sous différentes formes.<br/><br/>
                                Cheers
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className={classes.divider} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <List className={classes.menuItem}>
                                <ListItem button>
                                    <ListItemIcon className={classes.menuIcon}>
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        disableTypography
                                        primary="Dashboard" />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon className={classes.menuIcon}>
                                        <ListIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        disableTypography
                                        primary="Surveys" />
                                </ListItem>
                            </List>
                            {/* <Link to="/">dashboard</Link>
                            <Link to="/surveylist">surveys</Link> */}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10} sm={10}>
                    {this.props.children}
                </Grid>
            </Grid>);
    }
}

export default withStyles(styleSheet)(AdminArea);