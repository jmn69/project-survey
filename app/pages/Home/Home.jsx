import React from 'react';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import MediaQuery from 'react-responsive';

const styles = {
  
}

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = { }
    }

    render() {
        const titleRd = null;
        return (
            <div>
                {/* -------------- Smartphone et tablette ---------------- */}

                <MediaQuery query='(max-width : 1024px)'>
                {}
                </MediaQuery>

                {/* -------------- PC & TV ---------------- */}

                <MediaQuery query='(min-width : 1024px)'>

                </MediaQuery>
            </div>);
    }
}