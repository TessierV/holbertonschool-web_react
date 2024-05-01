import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';

describe('App Component', () => {
  it('does not display CourseList when logged out', () => {
    const wrapper = shallow(<App isLoggedIn={false} displayDrawer={false} />);
    expect(wrapper.find(CourseList).exists()).toBeFalsy();
  });

  describe('when isLoggedIn is true', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(<App isLoggedIn={true} displayDrawer={false} />);
    });

    it('does not include Login component', () => {
      expect(wrapper.find(Login).exists()).toBeFalsy();
    });

    it('includes CourseList component', () => {
      expect(wrapper.find(CourseList).exists()).toBeTruthy();
    });

    it('calls logOut and displays alert when Ctrl+h is pressed', () => {
      const logOutMock = jest.fn();
      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

      // Simuler l'appui sur les touches Ctrl+h
      const event = new KeyboardEvent('keydown', {
        ctrlKey: true,
        key: 'h'
      });
      window.dispatchEvent(event);

      // Vérifier que logOut a été appelé et que alert a été appelé avec le message approprié
      expect(logOutMock).toHaveBeenCalled();
      expect(alertMock).toHaveBeenCalledWith('Logging you out');

      // Restaurer la fonction alert
      alertMock.mockRestore();
    });
  });
});
