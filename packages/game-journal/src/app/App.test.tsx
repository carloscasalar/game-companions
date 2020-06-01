import React from 'react';
import App from './App';
import { mount, shallow, ShallowWrapper } from 'enzyme';
import { Header } from './layout/Header';

jest.mock('./layout/Header', () => ({
    Header() {
        return <div>the header</div>;
    },
}));

describe('<App />', () => {
    it('renders without crashing', () => {
        const component = mount(<App />);
        component.unmount();
    });

    describe('when rendered', () => {
        let component: ShallowWrapper;
        beforeEach(() => {
            component = shallow(<App />);
        });

        it('should render the header', () => {
            expect(component.find(Header).exists()).toBe(true);
        });
    });
});
