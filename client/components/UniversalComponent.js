import React from 'react';
import universal from 'react-universal-component';
import { spinner, admin, login, notFound } from '../css/Switcher';

const loading = () => <div ><div /></div>

export default universal(({ page }) => import(`./${page}`), {
  minDelay: 500,
  loading,
  chunkName: props => props.page,
  error: () => <div className={notFound}>PAGE NOT FOUND - 404</div>
})