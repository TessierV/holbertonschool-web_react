import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';

describe('<Notifications />', () => {
  it('renders three NotificationItem components when passed listNotifications', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong>' } },
    ];
    const wrapper = shallow(<Notifications displayDrawer listNotifications={notifications} />);
    expect(wrapper.find('NotificationItem')).toHaveLength(3);
  });

  it('renders one NotificationItem component when no listNotifications is passed', () => {
    const wrapper = shallow(<Notifications displayDrawer />);
    expect(wrapper.find('NotificationItem')).toHaveLength(1);
    expect(wrapper.find('NotificationItem').html()).toEqual(
      '<li data-notification-type="default">No new notification for now</li>'
    );
  });
});
