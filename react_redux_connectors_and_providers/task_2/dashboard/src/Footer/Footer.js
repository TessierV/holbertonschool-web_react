import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import { getFullYear, getFooterCopy } from '../utils/utils';

function Footer({ user }) {
  return (
    <>
      <footer className={css(styles.footer)}>
        {user ? `Welcome ${user.email} - ` : ''}Copyright {getFooterCopy()} &copy; {getFullYear()}
      </footer>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'center',
    fontStyle: 'italic',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Footer);
