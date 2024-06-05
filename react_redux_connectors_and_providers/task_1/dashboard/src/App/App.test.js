import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import rootReducer from '../reducers/rootReducer';

describe('App component', () => {
  it('displays the drawer when displayDrawer is true in Redux state', () => {
    const store = createStore(rootReducer, {
      ui: {
        isUserLoggedIn: true,
        isNotificationDrawerVisible: true
      }
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByTestId('notifications-drawer')).toBeInTheDocument();
  });

  it('hides the drawer when displayDrawer is false in Redux state', () => {
    const store = createStore(rootReducer, {
      ui: {
        isUserLoggedIn: true,
        isNotificationDrawerVisible: false
      }
    });

    const { queryByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(queryByTestId('notifications-drawer')).not.toBeInTheDocument();
  });

  it('toggles the drawer when the displayNotificationDrawer and hideNotificationDrawer actions are dispatched', () => {
    const store = createStore(rootReducer, {
      ui: {
        isUserLoggedIn: true,
        isNotificationDrawerVisible: false
      }
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByTestId('notifications-drawer')).not.toBeInTheDocument();

    fireEvent.click(getByTestId('display-drawer-button'));
    expect(getByTestId('notifications-drawer')).toBeInTheDocument();

    fireEvent.click(getByTestId('hide-drawer-button'));
    expect(getByTestId('notifications-drawer')).not.toBeInTheDocument();
  });
});
