import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import { StyleSheetTestUtils } from "aphrodite";

describe('Notifications Component', () => {
  let wrapper;
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    wrapper = shallow(<Notifications displayDrawer={true} listNotifications={[]} />);
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    expect(wrapper).not.toBeNull();
  });

  it('renders NotificationItem elements correctly with data', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } }
    ];
    wrapper.setProps({ listNotifications: notifications });
    expect(wrapper.find(NotificationItem).length).toBe(notifications.length);
  });

  it('renders correctly if listNotifications is empty or not passed', () => {
    expect(wrapper.find(NotificationItem).length).toEqual(0);
    expect(wrapper.text()).toContain('No new notification for now');

    const wrapperWithoutProp = shallow(<Notifications displayDrawer={true} />);
    expect(wrapperWithoutProp.find(NotificationItem).length).toEqual(0);
    expect(wrapperWithoutProp.text()).toContain('No new notification for now');
  });

  it('renders "No new notification for now" when listNotifications is empty', () => {
    wrapper.setProps({ listNotifications: [] });
    expect(wrapper.text()).toContain("No new notification for now");
    expect(wrapper.text()).toContain("Here is the list of notifications");
  });

  it('does not display "Here is the list of notifications" when notifications are empty', () => {
    expect(wrapper.text()).toContain('Here is the list of notifications');
    expect(wrapper.text()).toContain('No new notification for now');
  });

  it('displays the menu item when displayDrawer is false', () => {
    wrapper.setProps({ displayDrawer: false });
    expect(wrapper.find('[data-test="menuItem"]').exists()).toBe(true);
  });

  it('hides the Notifications div when displayDrawer is false', () => {
    wrapper.setProps({ displayDrawer: false });
    expect(wrapper.find('.Notifications').exists()).toBe(false);
  });

  it('displays the menu item when displayDrawer is true', () => {
    wrapper.setProps({ displayDrawer: true });
    expect(wrapper.find('[data-test="menuItem"]').exists()).toBe(true);
  });

  it('displays the Notifications div when displayDrawer is true', () => {
    wrapper.setProps({ displayDrawer: true });
    expect(wrapper.find('[data-test="notifications"]').exists()).toBe(true);
  });

  it('renders correct html for NotificationItems', () => {
    const notifications = [{ id: 1, type: 'default', html: { __html: '<u>test</u>' } }];
    wrapper.setProps({ listNotifications: notifications });
    expect(wrapper.find(NotificationItem).html()).toContain('<u>test</u>');
  });

  it('should display the correct text', () => {
    expect(wrapper.text()).toContain('Your notifications');
  });

  it('calls markAsRead with the right message when markAsRead is triggered', () => {
    const instance = wrapper.instance();
    const id = 123;
    instance.markAsRead(id);
    expect(consoleSpy).toHaveBeenCalledWith(`Notification ${id} has been marked as read`);
  });

  it('does not re-render when updating props with the same list', () => {
    const notifications = [{ id: 1, type: 'default', value: 'New course available' }];
    wrapper.setProps({ listNotifications: notifications });

    const spy = jest.spyOn(wrapper.instance(), 'render');
    wrapper.setProps({ listNotifications: notifications });
    expect(spy).not.toHaveBeenCalled();
  });

  it('re-renders when updating props with a longer list', () => {
    const notifications = [{ id: 1, type: 'default', value: 'New course available' }];
    wrapper.setProps({ listNotifications: notifications });

    const longerNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];

    const spy = jest.spyOn(wrapper.instance(), 'render');
    wrapper.setProps({ listNotifications: longerNotifications });
    expect(spy).toHaveBeenCalled();
  });
});
