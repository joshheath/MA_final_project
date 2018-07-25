import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Welcome from '../src/components/welcome.jsx';

Enzyme.configure({ adapter: new Adapter() })

describe('Welcome', () => {
  it('Welcome renders hello world', () => {
    const welcome = Enzyme.shallow(<Welcome />);
    expect(welcome.find('div').text()).toEqual('Hello world');
  });
});
