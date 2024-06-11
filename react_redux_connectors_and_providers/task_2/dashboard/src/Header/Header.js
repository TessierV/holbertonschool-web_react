import React from 'react';
import { connect } from 'react-redux'; // Import connect
import { StyleSheet, css } from 'aphrodite';
import logo from '../assets/logo.jpg';
import { logout } from '../actions/authActions'; // Import the logout action creator

function Header({ user, logout }) { // Receive user and logout props
  const handleLogout = () => {
    // Dispatch the logout action when the user clicks on the link
    logout();
  };

  return (
    <>
      <header className={css(styles['App-header'])}>
        <img src={logo} className={css(styles['App-logo'])} alt="logo" />
        <h1>School dashboard</h1>
        {user && <a href="#" onClick={handleLogout}>Logout</a>} {/* Display logout link if user is logged in */}
      </header>
    </>
  );
}

const styles = StyleSheet.create({
  'App-logo': {
    height: '30vmin',
    pointerEvents: 'none',
  },
  'App-header': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: '#E1003C',
    fontWeight: 'bolder',
  }

});

// Define mapStateToProps function
const mapStateToProps = (state) => {
  return {
    user: state.user, // Map user prop to the user within the Redux state
  };
};

// Connect Header component to mapStateToProps and logout action creator
export default connect(mapStateToProps, { logout })(Header);
