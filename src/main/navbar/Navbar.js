import Navbar from 'react-bootstrap/Navbar';
import React, { Component } from 'react';

import logo from '../../assets/images/logo.png';
import './Navbar.scss';

class NavBar extends Component {
  // -----------Render--------------------
  render() {
    const styles = {
      paddingLeft: '20px',
      color: '#a53838',
    };
    return (
      <Navbar fixed="top" variant="dark">
        <Navbar.Brand href="/">
          <img src={logo} width="40" height="40" alt="my site logo" />
          <span style={styles}>Covid 19 | India Data Tracker</span>
        </Navbar.Brand>
      </Navbar>
    );
  }
}

/* Exports ================================================================== */
export default NavBar;
