import React from 'react';

import Switcher from './Switcher';
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
                <Switcher />
            </div>
        );
    }
}

export default AdminArea;