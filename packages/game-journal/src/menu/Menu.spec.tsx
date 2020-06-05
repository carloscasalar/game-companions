import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Menu } from './Menu';

describe('<Menu />', () => {
  let component: ShallowWrapper;
  beforeEach(() => {
    component = shallow(<Menu />);
  });

  it('should show the login link', () => {
    expect(component.find('[data-qa="login-link"]').text()).toEqual('Login ');
  });
});
