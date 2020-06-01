import React from 'react';
import App from './App';
import { mount } from 'enzyme';

it('renders without crashing', () => {
    const component = mount(<App />);
    component.unmount();
});
