import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { Header } from './Header';
import { Menu } from '../../menu/Menu';

jest.mock('../../menu/Menu', () => ({
  Menu() {
    return <div>the menu</div>;
  },
}));

describe('<Header />', () => {
  let component: ShallowWrapper;
  beforeEach(() => {
    component = shallow(<Header />);
  });

  it('should show the menu', () => {
    expect(component.find(Menu).exists()).toBe(true);
  });
});
