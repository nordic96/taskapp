import React from 'react';
import { render } from 'enzyme';
import Header from '../Header';

describe('Testing Header Component', () => {
    it('Should match with snapshot', () => {
        const wrapper = render(<Header />);
        expect(wrapper).toMatchSnapshot(); 
    });
});
