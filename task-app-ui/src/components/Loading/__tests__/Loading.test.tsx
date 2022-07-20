import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../Loading';

describe('Testing Loading Component', () => {
    it('Renders and matches snapshot', () => {
        const wrapper = shallow(<Loading />);
        expect(wrapper).toMatchSnapshot();
    });
});
