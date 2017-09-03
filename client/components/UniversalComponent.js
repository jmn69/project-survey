import React from 'react';
import universal from 'react-universal-component';
import { spinner, admin, login, notFound } from '../css/Switcher.css';

const loading = () => <span className='fa fa-spinner fa-pulse fa-3x fa-fw' />

export default universal(({ page }) => import(`./${page}`), {
  minDelay: 500,
  loading: loading,
  chunkName: props => props.page,
  error: () => <div className={notFound}>PAGE NOT FOUND - 404</div>
})