import React from 'react';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import styles from '../css/Signin.css';

import Switcher from './pages/Switcher';
import MenuBar from './MenuBar';

class AdminArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <MenuBar />
                <Container style={{paddingTop: '1rem'}} fluid>
                    <Switcher />
                </Container>
            </div>
        );
    }
}

export default AdminArea;