import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Graph from '../src/components/graph.jsx';

Enzyme.configure({ adapter: new Adapter() })

describe('Graph', () => {
  it('Graph renders data', () => {
    const data = [
      {quarter: 1, earnings: 65000},
      {quarter: 2, earnings: 16500},
      {quarter: 3, earnings: 14250},
      {quarter: 4, earnings: 19000}
    ];

    const graph = Enzyme.shallow(<Graph visData={data}/>);
  });
});
