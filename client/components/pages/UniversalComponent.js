import React from 'react';
import universal from 'react-universal-component';
import { notFound } from '../../css/Switcher.css';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import styles from '../../css/Signin.css';

const loading = () => {
  return (
    <Row className={`${styles.root} align-items-center justify-content-center`}>
      <Col md="2">
        <span className='fa fa-spinner fa-pulse fa-3x fa-fw' />
      </Col>
    </Row>
  );
}


export default universal(({ page }) => import(`./${page}`), {
  minDelay: 500,
  loading: loading,
  chunkName: props => props.page,
  error: () => <div className={notFound}>PAGE NOT FOUND - 404</div>
})