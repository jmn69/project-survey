import React from 'react';

import Switcher from './Switcher';

class AdminArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Switcher />
        );
    }
}

export default AdminArea;