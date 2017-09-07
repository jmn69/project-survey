import React from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, Transition } from 'transition-group';
import UniversalComponent from './UniversalComponent';
// import '../css/Switcher.css';

const Switcher = ({ page, direction }) =>
  // <TransitionGroup
  //   className={`switcher ${direction}`}
  //   duration={500}
  //   prefix='slide'
  // >
  //   <Transition key={page}>
      <UniversalComponent page={page} />
  //   </Transition>
  // </TransitionGroup>

const mapState = ({ page, ...state }) => ({
  page
})

export default connect(mapState)(Switcher)