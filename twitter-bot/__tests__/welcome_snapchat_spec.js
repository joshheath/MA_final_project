import React from 'react';
import renderer from 'react-test-renderer';
import Welcome from '../src/components/welcome.jsx'

describe('Welcome (Snapshot)', () => {
    it('Welcome renders hello world', () => {
        const component = renderer.create(<Welcome />);
        const json = component.toJSON();
        expect(json).toMatchSnapshot();
    });
});