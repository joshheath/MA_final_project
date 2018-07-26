import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Hashtag from '../src/components/hashtag.jsx';

Enzyme.configure({ adapter: new Adapter() })

describe('Hashtag', () => {
  it('Hashtag renders hello world', () => {
    const hashtag = Enzyme.shallow(<Hashtag />);
    expect(hashtag.find('div').text()).toEqual('Hello world');
  });
});
